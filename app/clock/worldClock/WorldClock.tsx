"use client"

import { useEffect, useState } from 'react'

type Props = {
    name: string
    timeZone: string
}

const WorldClock = ({ timeZone }: Props) => {
  	const [time, setTime] = useState<string>('')
  	const [date, setDate] = useState<string>('')

  	useEffect(() => {
  	  	const updateTime = () => {
  	  	  	const now = new Date()

  	  	  	const timeFormatter = new Intl.DateTimeFormat('ja-JP', {
  	  	  	  	timeZone,
  	  	  	  	hour: '2-digit',
  	  	  	  	minute: '2-digit',
  	  	  	  	second: '2-digit',
  	  	  	  	hour12: false,
  	  	  	})
		  
  	  	  	const dateFormatter = new Intl.DateTimeFormat('ja-JP', {
  	  	  	  	timeZone,
  	  	  	  	year: 'numeric',
  	  	  	  	month: '2-digit',
  	  	  	  	day: '2-digit',
  	  	  	  	weekday: 'short',
  	  	  	})
		  
  	  	  	setTime(timeFormatter.format(now))
  	  	  	setDate(dateFormatter.format(now))
  	  	}
	  
  	  	updateTime()
  	  	const interval = setInterval(updateTime, 1000)
	  
  	  	return () => clearInterval(interval)
  	}, [timeZone])

  	return (
  	  	<div className="text-center">
  	  	  	<div className="mb-2 text-3xl font-bold tracking-wider">{time}</div>
  	  	  	<div className="text-sm text-muted-foreground">{date}</div>
  	  	</div>
  	)
}

export default WorldClock
