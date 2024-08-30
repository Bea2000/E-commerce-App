import { Container } from '@mui/material';
import Image from 'next/image';
import React from 'react';

export default function WelcomePage() {
return (
    <Container className='flex flex-row w-full m-0 pt-16 px-0'>
            <Container className='flex flex-col w-1/2 bg-[#7cd3c3]'>
                    <Image src='/delivery_truck.png ' alt='delivery truck' width={500} height={200} />
            </Container>
            <Container className='flex flex-col items-center justify-center w-1/2 bg-nomad-orange'>
                    <h1 className='text-4xl font-bold font-work-sans m-4'>Bienvenido a Nomad</h1>
                    <p className='text-lg font-work-sans text-center'>Somos una empresa de tecnología y logística especializada en e-commerce, dedicada a prestar servicios de picking y entregas on-demand 📦</p>
            </Container>
    </Container>
)
}
