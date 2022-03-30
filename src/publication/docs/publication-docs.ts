import { ApiProperty } from "@nestjs/swagger"

export class PublicationDocs {
    @ApiProperty({ example: '1', description: 'unique id of the publication'} )
    id: number
    @ApiProperty({ example: '2022-03-28T20:17:29.567Z', description: 'date when publication was created'} )
    createdAt: Date
    @ApiProperty({ example: '2022-03-28T20:17:29.567Z', description: 'date when the last time publication was updated'} )
    updatedAt: Date
    @ApiProperty({ example: '2022-03-28T20:17:29.567Z', description: 'date when publication will be expired'} )
    expiredAt: Date | null
    @ApiProperty({ example: '28 May', description: 'the current position of the user'} )
    from: string
    @ApiProperty({ example: 'Old City', description: 'the position where user wants go'} )
    to: string
    @ApiProperty({ example: 'No, smoking', description: 'criteria of the user'} )
    criteria: string | null
    @ApiProperty({ example: '12.5', description: 'price in order to reach desired position'} )
    price: number
    @ApiProperty({ example: '1', description: 'id of the user that created publicaiton'} )
    authorId: number
}