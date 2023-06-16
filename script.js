let weight = 29
try {

    console.log("호호~~~")
    if (weight < 30) {
        throw new Error("너무 졸린다.")
    }
    console.log("밥먹자~~~")
    //소스코드를 쓴다.
    //이안에서 에러가 발생하면
} catch (error) {

    //catch가 에러를 잡아준다.
    console.log("내가 잡은 에러는", error.message)

}

