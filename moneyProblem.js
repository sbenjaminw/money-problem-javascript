
//	Money Problem.
//	The purpose of this class is to 
//	count the current UK currency from 
//	a given ammount. 

//	For example, if the ammount is £28, then 
//	there will be:

//	£20 * 1
//	£5 * 1
//	£2 * 1
//	£1 * 1

//	This gives the highest values.

class MoneyProblem {
	
	constructor(){
		
		//	Array of current UK currency.
		//	First array is pound notes and coins.
		//	Second array is pence pennies.
		this.currency = [
			[
				{"currencyName":"£50", "currencyValue":50, "currencyNo":0, "currencyType":"NOTE"},
				{"currencyName":"£20", "currencyValue":20, "currencyNo":0, "currencyType":"NOTE"},
				{"currencyName":"£10", "currencyValue":10, "currencyNo":0, "currencyType":"NOTE"},
				{"currencyName":"£5", "currencyValue":5, "currencyNo":0, "currencyType":"NOTE"},
				{"currencyName":"£2", "currencyValue":2, "currencyNo":0, "currencyType":"NOTE"},
				{"currencyName":"£1", "currencyValue":1, "currencyNo":0, "currencyType":"NOTE"}
			],
			[
				{"currencyName":"50pence", "currencyValue":50, "currencyNo":0, "currencyType":"PENCE"},
				{"currencyName":"20pence", "currencyValue":20, "currencyNo":0, "currencyType":"PENCE"},
				{"currencyName":"10pence", "currencyValue":10, "currencyNo":0, "currencyType":"PENCE"},
				{"currencyName":"5pence", "currencyValue":5, "currencyNo":0, "currencyType":"PENCE"},
				{"currencyName":"2pence", "currencyValue":2, "currencyNo":0, "currencyType":"PENCE"},
				{"currencyName":"1pence", "currencyValue":1, "currencyNo":0, "currencyType":"PENCE"}
			]
			
		];
		
		//	After finding out notes, this is the calculation 
		//	of the ammount.
		//	So for example if it has been calculated 
		//	£28 has one twenty pound note, it will calculate that ammount 
		//	and then take that away from £28 (28 - (1 * 20)), which will leave 8. This will 
		//	be ammountAfterNoteCalculation. This will then become the new 
		//	"ammount to change".
		this.ammountAfterNoteCalculation = 0;
		
		this.notesAmmountToChange = 0;
		this.penceAmmountToChange = 0;
		
	}
	
	//	The ammount to change into change.
	//	Converts the given ammount to a string and
	//	then splits it to get the decmial ammount. 
	//	In some countries, the ammount is split by a comma , rather
	//	than a stop .
	SetAmmountToChange(ammount){
		
		//	Convert the ammount to a string 
		let ammountStr = ammount.toString();
		
		//	The array of split result 
		var resultOfSplit = 0;
			
		if(ammountStr.includes(',')){
			resultOfSplit = ammountStr.split(',');
		} 
			
		if(ammountStr.includes('.')){
			resultOfSplit = ammountStr.split('.');
		}
				
		this.notesAmmountToChange = parseInt(resultOfSplit[0]);
		this.penceAmmountToChange = parseInt(resultOfSplit[1]);
		
	}
	
	//	Does the division.
	//	Flag = if doing pennies or notes 
	Divisor(flag, currencyName){
		
		//	Notes and pennies.
		var notes = 0, pence = 0;
		
		var returnResult = 0;
		
		switch(flag){
			case "NOTE":
			
				//	Loop through the array and then check the name 
				//	Then attempt to divide the notes ammount to change with the current 
				//	note value. Then round the result down. Then set returnResult as result 
				//	of division calculation.
				for(let a = 0; a < this.currency[0].length; a++){
				
					if(currencyName == this.currency[0][a].currencyName){
										
						notes = Math.floor((this.notesAmmountToChange / this.currency[0][a].currencyValue));

					}
				}
			
				returnResult = notes;
			
			break;
			case "PENCE":
			
				for(let a = 0; a < this.currency[1].length; a++){
					
					if(currencyName == this.currency[1][a].currencyName){
						
						pence = Math.floor((this.penceAmmountToChange / this.currency[1][a].currencyValue));
						
					}
					
				}

				returnResult = pence;
			
			break;
			default:
				returnResult = 0;
			break;
		}
		
		return returnResult;		
		
	}
	
	//	Counts the currency 
	CountCurrency(){
		
		//	While the notesAmmountToChange or the penceAmmountToChange is greater than 0.
		//	This is better than using && .
		while(this.notesAmmountToChange > 0 || this.penceAmmountToChange > 0){
			
			for(let a = 0; a < this.currency[0].length; a++){
				
				let notesDivisorResult = this.Divisor(
					this.currency[0][a].currencyType, this.currency[0][a].currencyName
				);
				
				if(notesDivisorResult > 0){
					this.currency[0][a].currencyNo = notesDivisorResult;
					this.notesAmmountToChange -= (this.currency[0][a].currencyValue * this.currency[0][a].currencyNo);
				}
				
			} 
			
			for(let a = 0; a < this.currency[1].length; a++){
				
				let penceDivisorResult = this.Divisor(
					this.currency[1][a].currencyType, this.currency[1][a].currencyName
				);
				
				if(penceDivisorResult > 0){
					this.currency[1][a].currencyNo = penceDivisorResult;
					this.penceAmmountToChange -= (this.currency[1][a].currencyValue * this.currency[1][a].currencyNo);
				}
				
			} 
			
			
		}
		
	}
	
}



let mp = new MoneyProblem();

mp.SetAmmountToChange("28.82");
mp.CountCurrency();

console.log(mp.currency[0]);
console.log(mp.currency[1]);
