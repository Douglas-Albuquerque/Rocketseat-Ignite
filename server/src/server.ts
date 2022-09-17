import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from 'cors';
import { convertHourStringToMinutes } from "./Utils/convert-hour-string-to-minutes";
import { convertMinutesToHourString } from "./Utils/convert-minutes-to-hour-string";

const app = express();

app.use(express.json())
app.use(cors())

const prisma = new PrismaClient

app.get('/games', async (request, response) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true
        }
      }
    }
    
  })

  return response.json(games);

});

app.post('/games/:id/ads', async (request, response) => {

  const gameId = request.params.id;
  const body: any = request.body;

  const ad = await prisma.ad.create({
    data:{
      gameId,
      name: body.name,
      discord: body.discord,
      yearsPlaying: body.yearsPlaying,
      weekDays: body.weekDays.join(","),
      hoursStart: convertHourStringToMinutes(body.hoursStart),
      hoursEnd: convertHourStringToMinutes(body.hoursEnd),
      useVoiceChannel: body.useVoiceChannel,
    }
  })

  return response.status(201).json(ad);

});


app.get('/games/:id/ads',async  (request, response) => {
  const gameId = request.params.id;

  const ads = await prisma.ad.findMany({
    
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      hoursStart: true,
      hoursEnd: true,
      yearsPlaying: true,
  
    },
    where: {
      gameId,
    },
    orderBy: {
      createdAt: 'desc',
    }

  })

  return response.json(ads.map(ad => {
    return {
      ...ad,
      weekDays: ad.weekDays.split(','),
      hoursStart: convertMinutesToHourString(ad.hoursStart),
      hoursEnd: convertMinutesToHourString(ad.hoursEnd),
      
    }
  }))
});

app.get('/ads/:id/discord',async (request, response) => {
  const adId = request.params.id;

  const ad = await prisma.ad.findUniqueOrThrow({
   select: {
     discord: true,
   },
   where: {
     id: adId,
   }
  })

 return response.json({
   discord: ad.discord,
  })
});

app.listen(3336)