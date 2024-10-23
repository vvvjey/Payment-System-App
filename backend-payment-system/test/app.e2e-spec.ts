import { INestApplication, ValidationPipe } from "@nestjs/common"
import {Test} from '@nestjs/testing'
import { Validate } from "class-validator"
import { AppModule } from "src/app.module"
describe('App EndtoEnd test',()=>{
  let app:INestApplication
  beforeAll(async()=>{
    const appModule = await Test.createTestingModule({
      imports:[AppModule]
    }).compile()
    app = appModule.createNestApplication()
    app.useGlobalPipes(new ValidationPipe())
    await app.init()
  })
  afterAll(async()=>{
    app.close()
  })
  it.todo('should PASS, keke 1');
  it.todo('should PASSS, keke 2');
})