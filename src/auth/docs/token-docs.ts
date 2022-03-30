import { ApiProperty } from "@nestjs/swagger";

export class TokenDocs {
    @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoibWFoYW1tYWQudGFnaGl6YWRhQHVmYXouYXoiLCJpYXQiOjE2NDg1MDMzMjUsImV4cCI6MTY0ODUwNDIyNX0._Dc4yCdvUpJk-v_YaStNSLvzPaeI51yo8iaBfWQ8vto', description: 'JWT token after registration or authorization of the user'} )
    token: string;
}