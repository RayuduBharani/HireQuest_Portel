import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import Cookies from "js-cookie"
import { FormEvent, useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FileUpload } from "@/components/ui/file-upload"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import app from "@/lib/firebase"
import { Progress } from "@/components/ui/progress"
import { toast } from "@/components/ui/use-toast"

interface IcookieData {
  success: boolean;
  role: string;
  token: string;
}

interface IFeedPost {
  _id: string;
  userId: {
    _id: string;
    username: string;
    image: string;
    role: string;
  };
  content: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

function Feed(): JSX.Element {
  // State management
  const [posts, setPosts] = useState<IFeedPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState<number>();
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File>();
  const [dialogOpen, setDialogOpen] = useState(false);

  const cookie = Cookies.get("bharani")
  let CookieData: IcookieData | null = null
  if (cookie) {
    CookieData = JSON.parse(cookie)
  }

  const handleFileUpload = (files: File[]) => {
    if (files[0]) {
      setImage(files[0]);
    }
  };  const handleNewPost = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!content.trim()) return;
    
    if (!CookieData?.token) {
      toast({
        title: "Error",
        description: "You must be logged in to create a post",
      });
      return;
    }
    
    try {
      let imageUrl = "";
      if (image) {
        const storage = getStorage(app);
        const storageRef = ref(storage, `feed-posts/${Date.now()}_${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        imageUrl = await new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
              setProgress(prog);
            },
            (error) => {
              console.error("Upload failed", error);
              reject(error);
            },
            async () => {
              try {
                const url = await getDownloadURL(uploadTask.snapshot.ref);
                resolve(url);
              } catch (error) {
                reject(error);
              }
            }
          );
        });
      }

      const response = await fetch("https://hirequest-portel-1.onrender.com/feed/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${CookieData.token}`,
        },
        body: JSON.stringify({
          content,
          image: imageUrl || undefined,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to create post");
      }

      // Reset form
      setContent("");
      setImage(undefined);
      setProgress(undefined);
      setDialogOpen(false);
      
      // Refresh posts
      await fetchPosts();
      
      toast({
        title: "Post created successfully!",
      });
    } catch (error) {
      console.error("Error creating post:", error);
      toast({
        title: "Error creating post",
        description: "Please try again",
      });
    }
  };

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://hirequest-portel-1.onrender.com/feed/posts", {
        headers: {
          "Authorization": `Bearer ${CookieData?.token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch posts");

      const data = await response.json();
      setPosts(data.data || []);
      console.log(data)
    } catch (error) {
      console.error("Error fetching posts:", error);
      toast({
        title: "Error fetching posts",
        description: "Please try again",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  return (    
  <div className="container max-w-xl mx-auto py-4 px-4 pt-[5rem]">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">Feed</h1>
        {CookieData?.role === "recruiter" && (
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600">
                Create Post
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create a New Post</DialogTitle>
                <DialogDescription>
                  Share updates, news, or job opportunities with the community
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleNewPost} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="What's on your mind?"
                    className="h-32 resize-none"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Image (optional)</Label>
                  <FileUpload onChange={handleFileUpload} />
                  {progress !== undefined && progress < 100 && (
                    <Progress value={progress} className="h-2" />
                  )}
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={!content.trim() || (progress !== undefined && progress < 100)}
                    className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
                  >
                    {progress !== undefined && progress < 100 ? "Uploading..." : "Post"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>
      <Separator className="mb-6" />
      
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-8">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-muted-foreground">Loading posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p className="mb-2">👋 No posts yet</p>
            <p className="text-sm">Be the first to share something!</p>
          </div>
        ) : (
          posts.map((post) => (
            <Card key={post._id} className="overflow-hidden hover:bg-accent/50 transition-colors">
              <div className="p-4">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10 border-2 border-purple-500/20">
                      <AvatarImage src={post.userId.image} />
                      <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white">
                        {post.userId.username[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-base truncate">{post.userId.username}</h3>
                        <p className="text-xs text-muted-foreground">{formatDate(post.createdAt)}</p>
                      </div>
                      <p className="text-xs text-muted-foreground">Recruiter</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-4">
                    {post.image && (
                      <div className="rounded-lg overflow-hidden bg-muted w-full md:w-1/3 flex-shrink-0">
                        <img 
                          src={post.image} 
                          alt="Post attachment" 
                          className="w-full h-[200px] md:h-[250px] object-cover" 
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="flex-1 space-y-2">
                      <p className="text-sm md:text-base leading-relaxed">{post.content}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

export default Feed