import "./Album.css";

export const AlbumSkeleton = () => {
  const imageList = Array.from({length: 10}).map((_, index) => (
    <div key={index} className="item relative w-40 h-48 md:w-52 md:h-60">           
      <div className="w-4/5 h-full bg-gray-300 animate-pulse"></div>
    </div>
  ));

  return (
    <>          
      <div className="mx-auto my-auto h-52 md:h-64 py-2 flex overflow-hidden items-wrap gap-2" dir='ltr'>
        <div className="flex flex-row items marquee">
          {imageList}
        </div>
        <div aria-hidden="true" className="flex flex-row items marquee">
          {imageList}
        </div>
      </div>
    </>
  )    
}
