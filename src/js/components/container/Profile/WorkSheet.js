import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actionTypes from '../../../../store/actions';

class WorkSheet extends Component{

   constructor(props) {
        super(props);

        this.state={

                worksheet:[],
                mode:[]

        }

        this.Card     =this.Card.bind(this);
        this.editMode =this.editMode.bind(this);
        this.showMode =this.showMode.bind(this);
        this.done     =this.done.bind(this);
        this.delete   =this.delete.bind(this);
        this.change   =this.change.bind(this);
    }

        //Helper Functions
        editMode(e){
            e.preventDefault();

           var index = e.target.id.slice(8,e.target.id.length);
               index = index==="" ? e.target.parentNode.id.slice(8,e.target.parentNode.id.length)  :  index

           if(index!==''){
               index=index-0;
             
             var obj= this.state.mode
             obj[index]="edit";

             this.setState({
                mode:obj
            })
           }
             
        }

        showMode(e){
            e.preventDefault();
            var index = e.target.id.slice(8,e.target.id.length);
            index = index==="" ? e.target.parentNode.id.slice(8,e.target.parentNode.id.length)  :  index
            if(index!==''){
                index=index-0;
              
                var obj= this.state.mode
                obj[index]="show";
 
                this.setState({  mode:obj })
            }
        }
    
        done(e){
            e.preventDefault();
            var index = e.target.id.slice(8,e.target.id.length);
            index = index==="" ? e.target.parentNode.id.slice(8,e.target.parentNode.id.length)  :  index;

            if(index!==''){
                index=index-0;
              
                var obj= this.state.mode
                obj[index]="show";
 
                this.setState({  mode:obj })
            }

            //sent to reducer the data and sent to database
        }
        delete(e){
            e.preventDefault();
            var index = e.target.id.slice(8,e.target.id.length);
            index = index==="" ? e.target.parentNode.id.slice(8,e.target.parentNode.id.length)  :  index;

            if(index!==''){
                index=index-0;
                
              var obj= this.state.worksheet
              obj = obj.filter((elem,i)=> i!==index); 
 
              this.setState({  worksheet:obj })
            }

            //sent to reducer the data and sent to database
        }
        change(e){

            var index = e.target.id.slice(5,e.target.id.length);
            index = index==="" ? e.target.parentNode.id.slice(5,e.target.parentNode.id.length)  :  index
            if(index!==''){
                index=index-0;
              
              var obj= this.state.worksheet

              obj[index].title=document.getElementById("name_"+index).value;
              obj[index].description=document.getElementById("text_"+index).value;

              this.setState({
                 worksheet:obj
             })
            }
        }
    //Helper Functions
 Card(elem,i,mode){

    var  extension  = mode==="edit"? "" :"-plaintext";
    
    var Edit  = mode === "edit" ? {display:"block"}: {display:"none"};
    var Show  = mode === "show" ? {display:"block"}: {display:"none"};

    return (
        <div class="card text-left mb-3 ">
                <div className="card-header bg-primary ">
                            <input id={"name_"+i} onChange={this.change}  className={"text-white form-control"+extension} style={{background :"rgb(255,255,255,0)",paddingLeft:"5px", fontSize:"16px"}} value={elem.title}/>
                </div>
                <div class="card-body ">
                     <h6 className="card-title">Description</h6>
                     <textarea id={"text_"+i}  className={"text-dark form-control"+extension} onChange={this.change} rows="2" value={elem.description}/>
                </div>

                <div className="card-footer bg-white " style={Show}>
                        <div className="btn-toolbar bg-white float-right " role="toolbar"  >
                                <div class="btn-group mr-2 " role="group" aria-label="First group">
                                    <button id={"btnEdit_"+i} type="button" className="btn bg-white" onClick={this.editMode}  ><i  id={"btnEdit-"+i} onClick={this.editMode}  className="fas fa-edit mr-2 text-success" /> </button>
                                    <button id={"btnTras_"+i} onClick={this.delete} type="button" className="btn bg-white"><i id={"btnTras-"+i} onClick={this.delete} className="fas fa-trash mr-2 text-danger"/></button>
                                </div>
                        </div>        
                </div>
                <div className="card-footer bg-white " style={Edit}>
                        <div className="btn-toolbar bg-white float-right " role="toolbar" >
                                <div class="btn-group mr-2 " role="group" aria-label="First group">
                                    <button id={"btnSend_"+i} onClick={this.done} type="button" className="btn bg-white" ><i id={"btnSend-"+i} onClick={this.done}  className="fas fa-paper-plane mr-2 text-success"/></button>
                                    <button id={"btnCanc_"+i} onClick={this.showMode} type="button" className="btn bg-white"  ><i id={"btnCanc-"+i} onClick={this.showMode} className="fas fa-times mr-2 text-danger" /></button>
                                </div>
                        </div>        
                </div>
      </div>
    )
}


          // LifeCycle Functions

componentWillMount() {
            this.setState({
                                 worksheet:     this.props.workpaper,
                                 mode :         this.props.workpaper.map(elem => "show" )
     }) 
   }
     
     
     
     componentWillReceiveProps(nextProps) {
    
     

         if(nextProps.change){
            this.setState({
                worksheet:      nextProps.workpaper,
                mode :          nextProps.workpaper.map(elem => "show" )
}) 
             nextProps.Change (false);
         }

        

         
      }


        render(){
            var Sheets= this.state.worksheet;
            console.log("Sheets",Sheets)
            return (
        
                    <div className="container-fluid">
                         
                         {Sheets.map((elem,index)=>{
                           return this.Card(elem,index,this.state.mode[index])
                         })}
                         
                    </div>
 
              );
        }
     
    }
  

    const mapStateToProps = state => {
        return {
            workpaper     : state.workpaper.Workpaper,
            change        : state.workpaper.change

        };
      };
      
    const mapDispatchToProps = dispatch => {
        return {
            Papers      : (papers) => dispatch({type: actionTypes.PAPERS , papers:papers}),
            Change      : (val) => dispatch({type: actionTypes.PAPERSCHANGE , val:val})

        };
      };
      
      export default connect(mapStateToProps, mapDispatchToProps)(WorkSheet);