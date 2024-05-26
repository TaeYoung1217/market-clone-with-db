from fastapi import FastAPI, UploadFile, Form, Response
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi_login import LoginManager
from fastapi_login.exceptions import InvalidCredentialsException
from typing import Annotated
import sqlite3


con = sqlite3.connect(
    "carrotDB", check_same_thread=False
)  # db와 연결, carrotDB는 db이름
cur = con.cursor()  # insert, select 등등 할때 사용하는 db에서 커서 개념

app = FastAPI()

SECRET = 'super-coding' #인코딩 정보, 노출되면 안됨!!!!
manager = LoginManager(SECRET,'/login') #SECRET 키를 이용하여 login페이지에서만 발급되도록

@manager.user_loader()




def query_user(id):
    con.row_factory = sqlite3.Row  # 컬럼명도 같이 가져옴
    cur = con.cursor()
    user = cur.execute(f"""
                       SELECT * FROM users WHERE id='{id}'
                       """).fetchone()
    return user


@app.post("/login")
def login(id:Annotated[str,Form()], 
                password:Annotated[str,Form()]):
    user = query_user(id)
    if not user:
        raise InvalidCredentialsException #401 Unauthorized 에러코드
    elif password != user['password']:
        raise InvalidCredentialsException
    
    access_token = manager.create_access_token(data={
        'id':user['id'],
        'name':user['name'],
        'email':user['email']
    }) #액세스 토큰 발급. JWT 방식. 토큰에 정보를 같이 보내줌
    
    return access_token



@app.post("/signup") #중복처리 필요!!!
async def signup(id:Annotated[str,Form()], 
                 password:Annotated[str,Form()], name:Annotated[str,Form()], email:Annotated[str, Form()]):
    cur.execute(f"""
                INSERT INTO users(id, name, email, password)
                VALUES('{id}', '{name}', '{email}', '{password}')
                """)
    con.commit()
    
    print(id, password)
    return "200"



@app.post("/items")  # js에서 post method로 보냈을때 동작하는 부분
async def create_item(  # await 를 사용하기 위해 async 선언
    image: UploadFile,
    title: Annotated[str, Form()],
    price: Annotated[int, Form()],
    description: Annotated[str, Form()],
    place: Annotated[str, Form()],  # js에서 넘어오는 객체에 대한 정보
    insertAt: Annotated[int, Form()],
):
    image_bytes = await image.read()  # 이미지 용량이 크기때문에 await 필요
    
    cur.execute(
    f"""
        CREATE TABLE I F NOT EXISTS items (
        id INTEGER PRIMARY KEY,
        title TEXT NOT NULL,
        image BLOB,
        price INTEGER NOT NULL,
        description TEXT,
        place TEXT NOT NULL,
        insertAt INTEGER NOT NULL
        );
    """
)
    
    cur.execute(
        f"""
            INSERT INTO items(title, image, price, description, place, insertAt)
            VALUES ('{title}','{image_bytes.hex()}',{price},'{description}','{place}',{insertAt})
        """
    )
    con.commit()
    return "200"


@app.get("/items")
async def get_items():
    con.row_factory = sqlite3.Row  # 컬럼명도 같이 가져옴
    cur = con.cursor()
    rows = cur.execute(
        f"""
            SELECT * FROM items
        """
    ).fetchall()

    return JSONResponse(
        jsonable_encoder(dict(row) for row in rows)
    )  # DB에서 읽어온 data를 json 형식으로 변환하는 부분


@app.get("/images/{item_id}")
async def get_image(item_id):
    cur = con.cursor()
    image_bytes = cur.execute(
        f"""
            SELECT image FROM items WHERE id={item_id}
        """
    ).fetchone()[
        0
    ]  # 튜플 하나만 가져올때 문법
    
    return Response(content=bytes.fromhex(image_bytes), media_type='image/*')

app.mount("/", StaticFiles(directory="frontend", html=True), name="frontend")
