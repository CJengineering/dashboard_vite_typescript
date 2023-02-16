class Metric{
    constructor(metric, breakdown,metric_type){
        this.metric=metric
        this.breakdown=breakdown
        this.metric_type=metric_type
    }
}
const test = new Metric('reach')
console.log(test)
const array_a=['a','b','c']
const array_b=[1,2,3]
const array_c=['tim','tom','bob']

const array_final=[]

const array_creator=(arr_a, arr_b, arr_c)=>{
 for (let i =0; i<arr_a.length; i++){
  
  array_final.push(new Metric(arr_a[i],arr_b[i],arr_c[i]))
 }
}

array_creator(array_a,array_b,array_c)
console.log(array_final[0])