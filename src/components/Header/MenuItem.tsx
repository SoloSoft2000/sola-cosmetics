import clsx from "clsx"

export const MenuItem = ({ menuName, isActive }: { menuName: string, isActive: boolean }) => {
  return (
    <div
      className={clsx("inline-flex items-center justify-center rounded-xl sm:rounded-full px-1 sm:px-2 lg:px-4 py-1 sm:py-2 text-sm xl:text-base  font-medium  transition duration-500",
        !isActive && "hover:shadow-stone-400 hover:shadow-lg hover:bg-primary hover:text-white text-stone-700",
        isActive && "text-primary cursor-default underline",
      )}>
      {menuName}
    </div>
  )
}
