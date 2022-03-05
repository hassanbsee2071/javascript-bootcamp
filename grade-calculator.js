
let gradeCalculate = function(studentScore, possibleScore) {

let percentage = (studentScore/possibleScore )* 100
console.log(`Percentage is ${percentage}%`)

if (percentage >= 90 && percentage <= 100){
    console.log(`You got A grade (${percentage}%)`)

}else if (percentage >= 80 && percentage <= 89){

    console.log(`You got B grade (${percentage}%)`)
}else if (percentage >= 70 && percentage <= 79){

    console.log(`You got C grade (${percentage}%)`)
}else if (percentage >= 60 && percentage <= 69){

    console.log(`You got D grade (${percentage}%)`)
}else if (percentage >= 0 && percentage <= 59){

    console.log(`You got F grade (${percentage}%)`)

} else {
    console.log(`You did not enter the correct percentage(${percentage}%)`)
}


}


let studentsScore
let possibleScore 

gradeCalculate(17, 20)