import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePublicationDto {
    @ApiProperty({ example: 'Old City', description: 'the position where user wants go'} )
    @IsString({message: 'to must be a string'})
    @IsNotEmpty({message: 'to must be not empty'})
    readonly to: string;

    @ApiProperty({ example: '28 May', description: 'the current position of the user'} )
    @IsString({message: 'from must be a string'})
    @IsNotEmpty({message: 'from must be not empty'})
    readonly from: string;

    @ApiProperty({ example: 'No, smoking', description: 'criteria of the user'} )
    @IsString({message: 'criteria must be a string'})
    @IsOptional()
    readonly criteria?: string;
    
    @ApiProperty({ example: '12.5', description: 'price in order to reach desired position'} )
    @IsNumber({},{message: 'price must be a number'})
    @IsNotEmpty({message: 'price must be not empty'})
    readonly price: number;
}