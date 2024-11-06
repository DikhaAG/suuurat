import BrandIcon from '@/components/icons/BrandIcon';
import SignForm from '@/components/signPage/SignForm';
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Surat - Sign in',
}

export default function Home() {
  return (
    <div className="h-screen content-center px-3 sm:px-10 xl:px-0">
      <div className="w-auto sm:w-96 ml-auto mr-auto p-6 shadow-lg rounded-md">
        <div className="">
          <BrandIcon iconSize={40} labelVisibility={true} labelSize={"text-4xl"} wrapper="justify-center pt-8 py-5"/>
          <SignForm />
        </div>
      </div>
    </div>
  );
}
