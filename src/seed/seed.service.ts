import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model, Promise } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios-adapter';

@Injectable()
export class SeedService {


  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter

  ) { }


  async executeSEED() {
    console.log(fetch);
    await this.pokemonModel.deleteMany({})

    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=300')

    //const insertPromiseArray = []
    const pokemmonToInsert: { name: string, no: number }[] = []
    data.results.forEach(async ({ name, url }) => {
      // console.log({name,url});

      const segments = url.split('/')
      // console.log(segments);

      const no = +segments[segments.length - 2]
      //console.log({ name, no });
      //const pokemon = await this.pokemonModel.create({ name, no }) //Metodo asyncrono tiene que terminar para q inserte
      pokemmonToInsert.push({ name, no })
    })
    //await Promise.all(insertPromiseArray)
    await this.pokemonModel.insertMany(pokemmonToInsert)

    return 'Seed Executed';
  }
}
