import React from 'react';

import { Checkbox } from '@/shared/ui/checkbox';
import { RadioButton } from '@/shared/ui/radio-button';
import { Switcher } from '@/shared/ui/switcher';
import { AdvertisingBanner } from '@/widgets/advertising-banner';
import { Hero } from '@/widgets/hero';
import { HotelCatalog } from '@/widgets/hotel-catalog';
import { OurAdvantages } from '@/widgets/our-advantages';
import { PopularDestinations } from '@/widgets/popular-destinations';
import { SubscribeToTheNewsletter } from '@/widgets/subscribe-to-the-newsletter';
import { Wzhuh } from '@/widgets/wzhuh';

export default function Egor() {
  return (
    <div className={`ml-5 mt-5 flex-col`}>
      <div className='container'>
        <Hero />
        <HotelCatalog />
      </div>

      <div className={`mb-5`}>
        <label>Switcher</label>
        <Switcher />
        <label>Switcher disabled</label>
        <Switcher isDisabled={true} />
        <label>Switcher active by default</label>
        <Switcher isActive={true} />
      </div>

      <div className={`mb-5`}>
        <label>Checkbox</label>
        <Checkbox label='Checkbox text' />
        <label>Checkbox disabled</label>
        <Checkbox label='Checkbox text' isDisabled={true} />
        <label>Switcher active by default</label>
        <Checkbox label='Checkbox text' isChecked={true} />
      </div>

      <div>
        <label>RadioButton</label>
        <RadioButton label='RadioButton text' />
        <label>RadioButton disabled</label>
        <RadioButton label='RadioButton text' isDisabled={true} />
        <label>Switcher active by default</label>
        <RadioButton label='RadioButton text' isSelected={true} />
      </div>

      <div className='container mb-5 flex flex-col gap-3'>
        <Hero />
        <Wzhuh />
        <AdvertisingBanner />
        <PopularDestinations />
        <OurAdvantages />
        <SubscribeToTheNewsletter />
      </div>
    </div>
  );
}
