import { Contact } from '@/components/Contact/Contact';
import { PostList } from '@/components/Posts/PostList';

export default function PostPage() {

  return (
    <main>
      <section className="border-b-2 border-primary/25">
        <div className="container mx-auto flex flex-col md:flex-row  justify-between md:gap-5">
          <div className="w-full lg:w-2/3">
            <PostList />
          </div>
          <div className="w-full md:w-1/3 hidden lg:flex flex-col items-center my-2 py-10">
            <Contact isPost />
          </div>
        </div>
      </section>
    </main>
  )
}