import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSpinner } from '@angular/material/progress-spinner';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'covid19india';


  

  term;
  p;
  q;
  IND=[];
  keys;
  recPer;
  actPer;
  decPer;
  todaysConf;
  todaysRec;
  todaysDec;
  totalConf;
  totalAct;
  totalRec;
  totalDec;
  constructor(private hc : HttpClient,private spinner: NgxSpinnerService) { 
    
    
    //State data
      hc.get("https://api.covid19india.org/data.json",{})
        .subscribe(res=>{
          //console.log("all over india :",res["statewise"][0])
          //this.IND[0] = res["statewise"][0];
          this.q = res["statewise"];
          //console.log(this.q)
          this.keys = Object.keys(this.q);
          //console.log(this.keys[0])
          this.recPer = Math.ceil(((this.q[0].recovered)*100)/(this.q[0].confirmed));
          this.actPer = Math.ceil(((this.q[0].active)*100)/(this.q[0].confirmed));
          this.decPer = Math.ceil(((this.q[0].deaths)*100)/(this.q[0].confirmed));
          this.todaysConf = (this.q[0].deltaconfirmed);
          this.todaysRec = this.q[0].deltarecovered
          this.todaysDec = this.q[0].deltadeaths
          this.totalConf = this.q[0].confirmed
          this.totalAct = this.q[0].active;
          this.totalRec = this.q[0].recovered;
          this.totalDec = this.q[0].deaths;
          //console.log(this.recPer,this.actPer,this.decPer)
        })
     
/*
    //Districts data     
      hc.get("https://api.covid19india.org/state_district_wise.json",{})
      .subscribe(res=>{
        //console.log(res)
        this.p = res["Telangana"];
        console.log("Telangana state",this.p)
      })  */
  }

  ngOnInit(): void {
  }


  div1:boolean=false;
  button1:boolean=true;
  nextbutton:boolean=false;
  result:boolean = false;
  currentquestion;
  finalResult="";  

  questions=["Do you have Cough?","Do you have Cold?","Shortness of breath or difficulty breathing?","Are you having body aches and chills?","Are you having a headache?","Do you have fever?(Temperature 37.8C and above)","Are you experiencing fatigue?","Did you lose sense of taste and smell?","Do you have history of travelling to an area infected with COVID-19?","Do you have direct contact with positive COVID-19 patient?"]

  startTest()
  {

    this.div1=true;
    this.nextbutton = true;
    this.currentquestion = this.questions[0]
    this.button1 = false;
    this.finalResult="LOW";
  }
  i=0;
  j=0;
  results=[];
  resultCount=0;


  yesnoFun(event){
    var e = event.target;
    console.log(e.value)
    this.results[this.j] = e.value;
    
    //console.log(this.results)
  }

  nextQuestion()
  {
    console.log(this.result[this.j])
    if(this.results[this.j] == null)
    {
      alert("Please select Yes or No.")
      return;
    }
    if(this.results[this.j]=="Yes")
    {
      this.resultCount+=1;
      if(this.resultCount >=5)
      {
        this.finalResult="HIGH"
      }
      else if(this.resultCount >=3)
      {
        this.finalResult="MEDIUM"
      }
      else
      {
        this.finalResult="LOW";
      }
    }
    this.j+=1;
    this.div1=false;
    this.i+=1;
    this.currentquestion = this.questions[this.i];
    console.log(this.currentquestion)
    if(this.i > this.questions.length - 1 )
    {
      console.log(this.i)
      this.div1 = false;
      this.result = true;
      return;
    }
    this.div1=true;
    console.log("question: true")
    console.log("results array:",this.results)
    console.log("Result Count (Yes)",this.resultCount)
  }

  retakeTest()
  {
    this.div1=true;
    this.nextbutton = true;
    this.currentquestion = this.questions[0]
    this.button1 = false;
    this.result = false;
    this.resultCount = 0;
    this.results=[];
    this.j = 0;
    this.i = 0;
    this.finalResult="LOW";

  }

  

  
  


  

 
  
  
}
