/////////////////////////////////
//End to end Selenium tests that execute via the browser
//Execute using: ./node_modules/.bin/protractor
/////////////////////////////////

describe('creating a new dog', function(){

	it('Creates a dog and then checks in list', function(){
		//Go to homepage
		browser.get('http://localhost:3001');
		
		//Click create dog - requires a class attribute setup in app.html
		element(by.css('nav .createDog')).click();
		
		//The pause helps debug the test at this point
		//browser.pause();
		
		//Fill out and submit form
		
		
		//user should now see the dog list with their dog included
		
	})
	
	
	
})

