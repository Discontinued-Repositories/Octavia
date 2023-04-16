import { NodeOptions } from "vulkava";

export const Nodes = [
  {
    id: 'Safira',
    hostname: process.env.HOSTNAME,
    port: 443,
    password: process.env.PASSWORD,
    secure: true
  },
  {
    id: 'Node 1',
    hostname: "lavalink2.devamop.in",
    password: "DevamOP",
    port: 8830,
		secure: false,
  },
  {
    id: "Node 2",
    hostname: "lavalink.devamop.in",
    password: "DevamOP",
    port: 443,
    secure: true
  },
  {
    id: "Node 3",
    hostname: "eu-lavalink.lexnet.cc",
    password: "lexn3tl@val!nk",
    port: 443,
    secure: true
  },
  {
    id: "Node 4",
    hostname: "suki.nathan.to",
    password: "adowbongmanacc",
    port: 443,
    secure: true
  }
] as NodeOptions[];