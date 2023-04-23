import { useRouter } from "next/router";

export default function InfoPanel({ itemNames }) {
    return (
        <div className='bg-blue-500 w-[400px] h-full self-start p-10 box-border rounded-s-lg'>
            <ul className=''>
                {itemNames.map((item) => {
                    return <InfoPanelListItem key={item.name} name={item.name} link={item.link} />
                })}
            </ul>
        </div>
    )

}

function InfoPanelListItem({ name, link, isActive }) {
    const router = useRouter();

    return (
        <div className="text-white" onClick={() => {
            router.push(link);
        }}>
            <li className={`li-anim-white ${isActive ? 'font-black' : 'font-medium'}`}>
                {name}
            </li>
        </div>
    )
}