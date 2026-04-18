import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { API_BASE_URL } from "../constants";

type Post = {
  id: number;
  title: string;
  thumbnailUrl: string;
  createdAt: string | number;
  categories: string[];
  content: string;
};

const NewsDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/posts/${id}`);
        const data = await res.json();
        setPost(data.post);
      } catch (error) {
        setError("記事の取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, []);

  if (loading) {
    return <p>記事を読み込み中です。</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!post) {
    return (
      <>
        <p className="mt-8">記事が見つかりませんでした。</p>
        <div>
          <Link to="/" className="topButton">
            トップへ戻る
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="max-w-200 mx-auto py-10">
        <div className="mt-8">
          <img src={post.thumbnailUrl} alt="あ" />
        </div>
        <div className="flex justify-between pt-4">
          <time>{new Date(post.createdAt).toLocaleDateString("ja-JP")}</time>
          <div className="flex gap-2">
            {post.categories.map((category) => {
              return <span>{category}</span>;
            })}
          </div>
        </div>
        <h1 className="text-4xl">{post.title}</h1>
        <p
          className="pt-4 text-left"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </>
  );
};

export default NewsDetail;
