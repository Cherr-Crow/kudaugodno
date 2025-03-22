'use client'
import { useState } from "react";

import { Typography } from "@/shared/typography"
import { TabBar } from "@/shared/ui/tab-bar"

import { ActiveTrips } from "./ActiveTrips";
import { ArchivalTrips } from "./ArchivalTrips";

export function Trips({ }) {

  const [tab, setTab] = useState<'Активные' | 'Архивные'>('Активные');

  function handleTab(tab: 'Активные' | 'Архивные'): void {
    setTab(tab);
  }

  return (

    <section className="relative">

      <div className="absolute -z-10 left-0 right-0 top-0 h-full w-full rounded-bl-[20px] rounded-br-[20px] bg-[url('/admin-panel-tourist-bckg.jpg')] bg-no-repeat bg-contain md:h-[90%] md:rounded-bl-[100px] md:rounded-br-[100px] lg:bg-[url('/admin-panel-tourist-bckg-lg.jpg')]"></div>
      <div className="container pt-7 pb-16 lg:pt-8">
        <div className="mb-6 md:mb-4 lg:mb-6">
          <Typography variant="h1" className="mb-1 text-[32px] font-semibold text-white md:mb-6 md:text-[40px] md:font-medium lg:text-[60px]">Поездки</Typography>
          <TabBar tabs={['Активные', 'Архивные']} getActiveTab={handleTab} />
        </div>
        <div>
          {tab === 'Активные' ? <ActiveTrips /> : <ArchivalTrips />}
        </div>
      </div>

    </section >

  )

}