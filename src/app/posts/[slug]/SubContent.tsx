type ContentProps = {
  type: string;
  data: string;
}

export const SubContent = ({content}: {content: ContentProps[]}) => {
  return content.map((item) => {
    switch(item.type) {
      case 'p':
        return <p className="text-sm md:text-base lg:text-lg text-justify">{item.data}</p>
      case 'li':
        return <p className="px-4 py-2 before:content-['-'] before:p-2 text-sm md:text-base lg:text-lg text-justify">{item.data}</p>
      default:
        return <p className="text-sm md:text-base lg:text-lg text-justify">{item.data}</p>
    }
  })
}
