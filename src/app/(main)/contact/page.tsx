import ContactMain from '@/components/contact/contact-form';
import ContactHero from '@/components/contact/contact-hero';
import ContactMap from '@/components/contact/contact-map';
import React from 'react';

const Contactpage = () => {
    return (
       <main className="min-h-screen bg-background text-foreground">
            <ContactHero/>
            <ContactMain/>
            <ContactMap/>
        </main>
    );
};

export default Contactpage;