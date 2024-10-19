import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';
export default function NubitLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <Image className='mr-2' src={'/nubit_icon.png'} width={55} height={55} alt='nubit-logo'/>
      <p className="text-[44px]">Nubit</p>
    </div>
  );
}
