import React from 'react';
import Waves from '../component/Waves/Waves';

const Error = () => {
    return (
        <div className="w-full h-screen relative">
            <div className="w-ful h-full flex flex-col flex-wrap items-center justify-center">
                <div>
                    <div className="w-full text-9xl text-center">
                        <div className="text-2xl mb-8">Oops! Something went wrong, try another page.</div>
                        <h1 className="font-bold">404</h1>
                        <h1 className="!text-5xl">PAGE NOT FOUND</h1>
                    </div>
                </div>
                <div className="py-4 px-6 w-52 text-center bg-black text-white text-lg mt-10 rounded-4xl hover:cursor-pointer hover:opacity-80">
                    <a href="/" className="absolute top-0 left-0 bottom-0 right-0"></a>
                    Back to Home
                </div>
            </div>

            <div className="absolute inset-0 z-[-20] opacity-10 pointer-events-none">
                <Waves className="absolute top-0 left-0 w-full h-full overflow-hidden" />
            </div>
        </div>
    );
};

export default Error;
