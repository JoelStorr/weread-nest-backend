import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { ListsService } from './lists.service';
import { newListDto } from './dtos/newList.dto';

@Controller('lists')
export class ListsController {

    constructor(private listsService: ListsService){}


    @Get("/")
    async getLists(@Request() req: any){

        const userId = req.user.sub;

        return await this.listsService.loadAllLists(userId);
    }

    @Post("/createlist")
    async createList(@Body() body:newListDto, @Request() req: any ){

        const userId = req.user.sub;

        const listId = await this.listsService.createList(userId, body.name, body.privateList);

        return listId;
    }

}
