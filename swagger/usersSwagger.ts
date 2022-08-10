import {UserEntity} from "../src/user/user.entity";
import {ApiProperty, OmitType} from "@nestjs/swagger";
import {CreatePersonDto, CreateCompanyDto} from "../src/auth/dto/createUser.dto";
import {LoginUserDto} from "../src/auth/dto/loginUserDto";
import {userType} from "../src/user/interfacesAndTypes/user.type";



export class Users extends OmitType(UserEntity, ['password']) {
    @ApiProperty({example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJhbm5hQGdhbWlsLmNvbSIsInVzZXJSb2xlcyI6W3sicm9sZV9pZCI6MSwidXNlcl9pZCI6NCwiaWQiOjQsImNyZWF0ZWRfYXQiOiIyMDIyLTA2LTIxVDA5OjA3OjM0Ljc5NFoiLCJ1cGRhdGVkX2F0IjoiMjAyMi0wNi0yMVQwOTowNzozNC43OTRaIn1dLCJpYXQiOjE2NTU4MDI0NTQsImV4cCI6MTY1NjQwNzI1NH0.SzNA9Z5Zlc_DIdQDPMDgVHZCGMLR7GBDtw-Rt_4qNoY'})
    token: string
}

export class UserWithoutBetsSwagger extends OmitType(Users, ['userBets']) {
}

export class UserWithCorrectTypeSwagger extends OmitType(CreatePersonDto, ['type']) {
    @ApiProperty({example: userType.PERSON})
    type: userType.PERSON
}

export class CompanyWithCorrectTypeSwagger extends OmitType(CreateCompanyDto, ['type']) {
    @ApiProperty({example: userType.LEGALENTITY})
    type: userType.LEGALENTITY
}

export class UsersSwagger {
    @ApiProperty()
    users: UserWithoutBetsSwagger
}

export class PersonRegisterSwagger {
    @ApiProperty()
    user: UserWithCorrectTypeSwagger
}

export class CompanyRegisterSwagger {
    @ApiProperty()
    user: CompanyWithCorrectTypeSwagger
}

export class LoginSwagger {
    @ApiProperty()
    user: LoginUserDto
}



