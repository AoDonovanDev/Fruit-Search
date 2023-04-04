const input = document.querySelector('#fruit');
const suggestions = document.querySelector('.suggestions ul');

const fruit = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];

function search(str) {
	let results = [];
	//push all matches into results array
	for(let entry of fruit){
		if(entry.toLowerCase().includes(str.toLowerCase())){
			results.push(entry);
		}
	}
	//alternate method using filter
	/* results = results.filter(function(fruit){
		return fruit.toLowerCase().includes(str.toLowerCase())
	}) */
	//sort results by index of match in string  
	results = results.sort( (current, compare) => current.toLowerCase().indexOf(str.toLowerCase()) - compare.toLowerCase().indexOf(str.toLowerCase()));
	return results;
}

function searchHandler(e) {
	//run search function with input value
	const suggestionsArray= search(input.value);
	//run dom display function showSuggestions with results and input value
	showSuggestions(suggestionsArray, input.value);
	console.log(suggestionsArray);
}

function showSuggestions([first, second, third, fourth, fifth, ...theRest], inputVal) {
	//clear box, do nothing if input empty
	removeAllChildNodes(suggestions);
	if(inputVal === ''){
		return;
	}
	const firstFive = [first, second, third, fourth, fifth]
	for(let item of firstFive){
		//if no matches, do nothing
		if(item === undefined){
			return;
		}
		const listItem = document.createElement('li');
		listItem.id = item;
		//make search term bold in result
		//edge case about capital first letters
		//if input string doesnt match anything in the searchbox, capitalise the first letter
		if(item.indexOf(inputVal) === -1){
			inputVal = inputVal[0].toUpperCase() + inputVal.substring(1).toLowerCase();
		}
		//if it still doesnt match, make it all lower case
		if(item.indexOf(inputVal) === -1){
			inputVal = inputVal.toLowerCase();
		}
		const boldSearchTerm = item.replace(inputVal, '<b>' + inputVal + '</b>')
		listItem.innerHTML = boldSearchTerm;
		listItem.tabIndex = 0;
		suggestions.append(listItem);
	}
}

function useSuggestion(e) {
	//select clicked item and clear searchbox
	input.value = e.target.id;
	removeAllChildNodes(suggestions);
}

function removeAllChildNodes(suggestionBox) {
    while (suggestionBox.firstChild) {
        suggestionBox.removeChild(suggestionBox.firstChild);
    }
}

input.addEventListener('keyup', searchHandler);
suggestions.addEventListener('click', useSuggestion);