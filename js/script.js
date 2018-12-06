var deck;
var playerHand;
var dealerHand;
var playerAmount = 0;
var dealerAmount = 0;
var pot = 0;
var wallet = 500;
var bustedDialog;
var betDialog;

$(function(){
	bustedDialog = $("#display").dialog({
				modal: true,
	      		autoOpen: false,
	      		closeOnEscape: false,
	      		resizable: false,
	      		height: 250,
	      		width: 400,
	      		show: {
	        		effect: "blind",
	        		duration: 500
	   			},
	      		hide: {
	       	 		effect: "fold",
	        		duration: 500
	       		},
	        	buttons: {
	        		"Play Another Game": function() {
	         			$( this ).dialog( "close" );
	         			reset();
	       			}
	    		}
	    	});

	betDialog = $("#doneBet2").dialog({
			modal: true,
	      	autoOpen: false,
	      	closeOnEscape: false,
	      	resizable: false,
	      	height: 210,
	      	width: 330,
	      	show: {
	        	effect: "blind",
	        	duration: 500
	   		},
	      	hide: {
	       	 	effect: "fold",
	        	duration: 500
	        },
	        buttons: {
	        "Yes": function() {
	        	$( this ).dialog( "close");
				playDealer();
				playHand();
				$("#dealerCards").fadeIn();
				$("#playerCards").fadeIn();
				$(".dealer").fadeIn();
				$(".player").fadeIn();
				$("#wallet").fadeOut();
				$("#placeBet").fadeOut();
				$("#doneBet").fadeOut();
				$(".chips").fadeOut();
				$("#title").fadeOut();
				$("#bet").css({"margin-top": "20%", "margin-left": "20%", "position": "fixed", "font-size": "20px"});
				$("h3").css({"color": "white"})
	        },
	        "No": function() {
	          $( this ).dialog( "close" );
	        }
	      }
	    });
});

function getDeck(){
   if (deck == null || deck === undefined){
   		deck = {};
   		for (var i = 0; i<9; i++){
   			deck[i] = (i+2) + "_of_clubs.png";
  		}

  		for (var i = 13; i<22; i++){
   			deck[i] = (i-11) + "_of_hearts.png";
  		}

  		for (var i = 26; i<35; i++){
   			deck[i] = (i-24) + "_of_diamonds.png";
  		}

  		for (var i = 39; i<48; i++){
   			deck[i] = (i-37) + "_of_spades.png";
  		}

  		deck[9] = "jack_of_clubs.png";
  		deck[10] = "queen_of_clubs.png";
  		deck[11] = "king_of_clubs.png";
  		deck[12] = "ace_of_clubs.png";
  		deck[22] = "jack_of_hearts.png";
  		deck[23] = "queen_of_hearts.png";
  		deck[24] = "king_of_hearts.png";
  		deck[25] = "ace_of_hearts.png";
  		deck[35] = "jack_of_diamonds.png";
  		deck[36] = "queen_of_diamonds.png";
  		deck[37] = "king_of_diamonds.png";
  		deck[38] = "ace_of_diamonds.png";
  		deck[48] = "jack_of_spades.png";
  		deck[49] = "queen_of_spades.png";
  		deck[50] = "king_of_spades.png";
  		deck[51] = "ace_of_spades.png";
  	}
  	return deck;
}

function reset(){
	pot = 0;
	playerHand = [];
	dealerHand = [];
	playerAmount = 0;
	dealerAmount = 0;
	$("#dealerCards img").remove();
	$("#playerCards img").remove();
	$('#money').css({"position": "static"});
	$("#bet").css({"margin-top": "0%", "margin-left": "46%", "postion": "static", "font-size": "15px"});
	$("#doneBet").css({"margin-top": "8%", "margin-left": "40%", "position": "fixed"});
	$("#dealerCards").fadeOut();
	$("#playerCards").fadeOut();
	$(".dealer").fadeOut();
	$(".player").fadeOut();
	$("#wallet").fadeIn();
	$("#placeBet").fadeIn();
	$("#doneBet").fadeIn();
	$(".chips").fadeIn();
	$("#title").fadeIn();
	$("h3").css({"color": "black"});
	playGame();
}

function resetBet(){
	pot = 0;
	$("#bet").html('<h3> Pot: $' + pot + "</h3>");
}

function doneBet(){
	  $("#doneBet2").html("<p> Are you OK with a bet of $" + pot + "? </p>");
	  $(betDialog).dialog( "open" );
}

function playGame(){
	$("#bust").hide();
	$("#money").hide();
	$("#notValid").hide();
	$("#dealerCards").hide();
	$("#playerCards").hide();
	$(".dealer").hide();
	$(".player").hide();
	getDeck();
	$("#bet").html('<h3> Pot: $' + pot + "</h3>");
	$("#wallet").html('<h3> Wallet: $' + wallet + "</h3>");
}

function playDealer(){
	dealerHand = [];
	dealerHand[0] = getCard(true);
	dealerHand[1] = getCard(true);

	displayCard('images/' + dealerHand[0], true);
	displayCardBack();

	console.log(JSON.stringify(dealerHand));
}

function playHand(){
	playerHand = [];
	playerHand[0] = getCard(false);
	playerHand[1] = getCard(false);

	displayCard('images/' + playerHand[0], false);
	displayCard('images/' + playerHand[1], false);

	if (getValue(playerHand) == 21){
		wallet += pot;
		$('#bust').html("<h2> YOU WON </h2>");
		$('#bust').effect("highlight", {color: 'green'}, 1000);
     	$('#bust').effect("highlight", {color: 'green'}, 1000);
     	$('#bust').effect("highlight", {color: 'green'}, 1000);
     	$('#bust').fadeOut();
     	$("#display").attr("title", "WON");
		$("#display").html("<p> You got Blackjack!  You won $" + pot + ". Your new wallet amount is $" + wallet + ". </p>");
		$(bustedDialog).dialog("open");
	}

	console.log(JSON.stringify(playerHand));
}

function displayCard(src, dealer){
	var img = document.createElement("img");
	img.src = src;
	img.style.width = "200px";
	img.style.marginLeft = "-140px";
	if(!dealer.valueOf()){
		document.body.appendChild(img);
		var x = document.querySelectorAll("#playerCards")[0];
		x.appendChild(img);
	}else{
		document.body.appendChild(img);
		var x = document.querySelectorAll("#dealerCards")[0];
		x.appendChild(img);
	}
}

function displayCardBack(){
	var img = document.createElement("img");
	img.src = 'images/card_back.png';
	img.id = "cardBack";
	img.style.width = "200px";
	img.style.marginLeft = "-140px";

	document.body.appendChild(img);
	var x = document.querySelectorAll("#dealerCards")[0];
	x.appendChild(img);
}

function hit(dealer){
	if (!dealer){
		playerHand[playerHand.length] = getCard(dealer);
		displayCard('images/' + playerHand[playerHand.length-1], dealer);
		if (getValue(playerHand, false) > 21){
			$('#bust').html("<h2> YOU BUSTED </h2>");
     		$('#bust').effect("highlight", {color: 'red'}, 1000);
     		$('#bust').effect("highlight", {color: 'red'}, 1000);
     		$('#bust').effect("highlight", {color: 'red'}, 1000);
     		$('#bust').fadeOut();
     		wallet -= pot;
     		$("#display").attr("title", "BUSTED");
     		$("#display").html("<p> You busted and lost $" + pot + ". Your new wallet amount is $" + wallet + ". </p>");
			$(bustedDialog).dialog("open");
		}
	}else{
		dealerHand[dealerHand.length] = getCard(dealer);
		displayCard('images/' + dealerHand[dealerHand.length-1], dealer);
		getValue(dealerHand, true);
	}
 	console.log(JSON.stringify(playerHand));
	
}

function getCard(dealer){
	var x = Math.floor(Math.random()*52);
	console.log(playerAmount);
	console.log(dealerAmount);
	return deck[x];
}

function getValue(hand, dealer){
	var numAces = 0;
	if (!dealer){
		playerAmount = 0;
		for (var i = 0; i<hand.length; i++){
			var value = hand[i].split("_")[0];
			if (value == parseInt(value, 10))
				playerAmount += parseInt(value, 10);
			else if (value === "king" || value === "jack" || value === "queen")
				playerAmount += 10;
			else if (value === "ace"){
				numAces++;
			}
		}
		if (numAces == 0)
			return playerAmount;
		else if (playerAmount + 11 + numAces - 1 > 21)
			playerAmount += numAces;
		else
			playerAmount += 11 + numAces - 1;
		
		return playerAmount;	
		console.log(playerAmount > 21);
	} else {
		dealerAmount = 0;
		for (var i = 0; i<hand.length; i++){
			var value = hand[i].split("_")[0];
			if (value == parseInt(value, 10))
				dealerAmount += parseInt(value, 10);
			else if (value === "king" || value === "jack" || value === "queen")
				dealerAmount += 10;
			else if (value === "ace"){
				numAces++;
			}
		}
		if (numAces == 0)
			return dealerAmount;
		else if (dealerAmount + 11 + numAces - 1 > 21)
			dealerAmount += numAces;
		else
			dealerAmount += 11 + numAces - 1;

		return dealerAmount;
		console.log(dealerAmount > 21);
	}
}

function doubleDown(){
	if (wallet < pot * 2){
		$('#money').css({"position": "fixed"});
		$('#money').effect("highlight", {color: 'red'}, 1000);
     	$('#money').effect("highlight", {color: 'red'}, 1000);
     	$('#money').effect("highlight", {color: 'red'}, 1000);
     	$('#money').fadeOut();
		return;
	}	
	pot *= 2;
	$("#bet").html('<h3> Pot: $' + pot + "</h3>");
	hit(false);
	if (playerAmount <= 21)
		playDealer2();
}

function stand(){
	playDealer2();
}

function playDealer2(){
	$("#cardBack").remove();
	displayCard('images/' + dealerHand[1], true);
	while(getValue(dealerHand, true) < 17){
		hit(true);
	}
	if (dealerAmount > 21){
		wallet += pot;
		$('#bust').html("<h2> DEALER BUSTED </h2>");
		$('#bust').effect("highlight", {color: 'green'}, 1000);
     	$('#bust').effect("highlight", {color: 'green'}, 1000);
     	$('#bust').effect("highlight", {color: 'green'}, 1000);
     	$('#bust').fadeOut();
     	$("#display").attr("title", "WON");
		$("#display").html("<p> The dealer busted.  You won $" + pot + ". Your new wallet amount is $" + wallet + ". </p>");
		$(bustedDialog).dialog("open");
	} else{
		determineWinner();
	}
}

function determineWinner(){
	if (playerAmount > dealerAmount){
		wallet += pot;
		$('#bust').html("<h2> YOU WON </h2>");
		$('#bust').effect("highlight", {color: 'green'}, 1000);
     	$('#bust').effect("highlight", {color: 'green'}, 1000);
     	$('#bust').effect("highlight", {color: 'green'}, 1000);
     	$('#bust').fadeOut();
     	$("#display").attr("title", "WON");
		$("#display").html("<p> You beat the dealer.  You won $" + pot + ". Your new wallet amount is $" + wallet + ". </p>");
		$(bustedDialog).dialog("open");
	} else if (playerAmount < dealerAmount){
		wallet -= pot;
		$('#bust').html("<h2> YOU LOST </h2>");
		$('#bust').effect("highlight", {color: 'red'}, 1000);
     	$('#bust').effect("highlight", {color: 'red'}, 1000);
     	$('#bust').effect("highlight", {color: 'red'}, 1000);
     	$('#bust').fadeOut();
     	$("#display").attr("title", "LOST");
		$("#display").html("<p> The dealer beat you.  You lost $" + pot + ". Your new wallet amount is $" + wallet + ". </p>");
		$(bustedDialog).dialog("open");
	} else {
		$('#bust').html("<h2> TIE </h2>");
		$('#bust').effect("highlight", {color: 'yellow'}, 1000);
     	$('#bust').effect("highlight", {color: 'yellow'}, 1000);
     	$('#bust').effect("highlight", {color: 'yellow'}, 1000);
     	$('#bust').fadeOut();
     	$("#display").attr("title", "TIE");
		$("#display").html("<p> It's a tie!  No one wins! Your wallet has $" + wallet + ". </p>");
		$(bustedDialog).dialog("open");
	}
}

function chip(number){
	if (wallet >= (pot + number)){
		if(number == 1){
			pot += 1;	
		} else if (number == 5){
			pot += 5;
		} else if (number == 25){
			pot += 25;
		} else if (number == 100){
			pot += 100;
		}

		$("#bet").html('<h3> Pot: $' + pot + "</h3>");
	} else {
		$('#money').effect("highlight", {color: 'red'}, 1000);
     	$('#money').effect("highlight", {color: 'red'}, 1000);
     	$('#money').effect("highlight", {color: 'red'}, 1000);
     	$('#money').fadeOut();
	}
}


