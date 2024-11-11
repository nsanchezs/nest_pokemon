import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports: [
    ConfigModule,
     //Esquema del modulo
    MongooseModule.forFeature([{
      name: Pokemon.name,
      schema: PokemonSchema
    }
    ])
  ],
  exports: [ //Exponemos el modulo para usar en otro modulo.
    MongooseModule
  ]
})
export class PokemonModule { }
