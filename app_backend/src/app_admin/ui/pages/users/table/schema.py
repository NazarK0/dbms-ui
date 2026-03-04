from pydantic import BaseModel, Field





class UsersTableEntry(BaseModel):
    id: int
    user_name: str = Field(
        alias="userName"
    )  # Keep Python snake_case while accepting camelCase JSON
    avatar: str
    nick_name: str = Field(alias="nickName")
    organization_unit: str = Field(alias="organizationUnit")
    timezone: str
    registration_date: str = Field(alias="registrationDate")
    lastactive_date: str = Field(alias="lastActiveDate")
    status: str

    class Config:
        populate_by_name = (
            True  # Allows instantiating with either "time_ago" or "timeAgo"
        )


