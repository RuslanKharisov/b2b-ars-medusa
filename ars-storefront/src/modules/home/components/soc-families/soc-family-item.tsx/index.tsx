import Image from "next/image"

interface FutureItemProps {
  title: string
  text: string
  iconUrl?: string | ""
}

const SocFamilyItem = ({ title, text, iconUrl: iconUrl }: FutureItemProps) => {
  return (
    <div>
      <div className="mb-8 flex h-10 w-full items-center justify-center">
        {iconUrl ? (
          <Image src={iconUrl} width={150} height={100} alt="logoImage" />
        ) : (
          "Todo: put sceleton"
        )}
      </div>
      <h3 className="mb-2 text-xl-semi text-center ">{title}</h3>
      <p className="md:text-lg text-center">{text}</p>
    </div>
  )
}

export default SocFamilyItem
