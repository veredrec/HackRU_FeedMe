//Intents

'use strict';

var priceList ={};
var restaurantList = {};

function getNearByChoices(session)
{
    var time_limit = session.attributes.time;
    var distance_limit = session.attributes.distance;
    var price_limit = session.attributes.price;
    
    //there should be a mongodb connection
    //and use the time&distance&price limit set by the user throughout the session
    //to filter, and then retrieve data from our database realtime, save it in result.
    
    
    var result = [
        {"cuisine": "American","restaurant": "Burger king","price": "5","description": "So good. Probably the best food in the world."}
        ,{"cuisine": "Chinese","restaurant": "China town","price": "10","description": "So good. Probably the best food in the world."}
        ,{"cuisine": "Indian","restaurant": "Garden","price": "20","description": "So good. Probably the best food in the world."}     
        ];
        
        
    let curCuisine = ''
    let curPrice = ''
    let curRestaurant = ''
    result.forEach(function(value)
    {
        for(var key in value)
        { 
            if(key === "cuisine")
            {
                curCuisine = value[key].toUpperCase();
            }
            else if(key === "price")
            {
                curPrice = value[key].toUpperCase();
            }
            else if(key === 'restaurant')
            {
                curRestaurant = value[key].toUpperCase();
            }
            if(curCuisine !== '' && curPrice !== '')
            {
                priceList[curCuisine] = curPrice;
            }
            if(curCuisine !== '' && curRestaurant !== '')
            {
                restaurantList[curCuisine] = curRestaurant;
            }
        
        }
    });
}


function buildSpeechletResponse(title, output, repromptText, shouldEndSession) 
{
    return {
        outputSpeech: {
            type: 'PlainText',
            text: output,
        },
        card: {
            type: 'Simple',
            title: `SessionSpeechlet - ${title}`,
            content: `SessionSpeechlet - ${output}`,
        },
        reprompt: {
            outputSpeech: {
                type: 'PlainText',
                text: repromptText,
            },
        },
        shouldEndSession,
    };
}

function buildResponse(sessionAttributes, speechletResponse) 
{
    return {
        version: '1.0',
        sessionAttributes,
        response: speechletResponse,
    };
}

function getWelcomeResponse(callback) 
{
    const sessionAttributes = {};
    const cardTitle = 'Welcome';
    const speechOutput = 'Welcome to Hack R U 2017. This is a demo version of our new app, Feed Me. ' +
                        'Would you like to dine out tonight?';
    // const speechOutput = 'Would you like to dine out tonight?';
 
    const repromptText = 'Would you like to dine out tonight?. ';
    const shouldEndSession = false;

    callback(sessionAttributes,
        buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}

function handleSessionEndRequest(callback) 
{
    const cardTitle = 'Session Ended';
    const speechOutput = 'Thank you for trying the demo. ';
    // Setting this to true ends the session and exits the skill.
    const shouldEndSession = true;

    callback({}, buildSpeechletResponse(cardTitle, speechOutput, null, shouldEndSession));
}

function confirmOrderResponse(callback) 
{
    const cardTitle = 'Session Ended';
    const speechOutput = 'Order confirmed! Thank you for trying the demo. ';
    // Setting this to true ends the session and exits the skill.
    const shouldEndSession = true;

    callback({}, buildSpeechletResponse(cardTitle, speechOutput, null, shouldEndSession));
}



function getDistanceResponse(callback) 
{
    const sessionAttributes = {};
    const cardTitle = 'Distance';
    const speechOutput = 'Within what miles do you want the restaurant to be located at?';
 
    const repromptText = 'Please describe the distance limit. ';
    const shouldEndSession = false;

    callback(sessionAttributes,
        buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}

function getPriceResponse(callback) 
{
    const sessionAttributes = {};
    const cardTitle = 'Distance';
    const speechOutput = 'Within what price range per person would you like to spend?';
 
    const repromptText = 'Please describe the price limit. ';
    const shouldEndSession = false;

    callback(sessionAttributes,
        buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}

function getTimeResponse(callback) 
{
    const sessionAttributes = {};
    const cardTitle = 'Price';
    const speechOutput = 'Within how many hours would you be going out to eat?';
 
    const repromptText = 'Please describe the time preference. ';
    const shouldEndSession = false;

    callback(sessionAttributes,
        buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}


function createDistanceAttributes(distance) {
    return {
        distance,
    };
}

function setDistanceTag(intent, session, callback) 
{
    const cardTitle = intent.name;
    const distanceKeyWordSlot = intent.slots.distance;
    let repromptText = '';
    let sessionAttributes = {};
    const shouldEndSession = false;
    let speechOutput = '';

    if (distanceKeyWordSlot) {
        const distance = distanceKeyWordSlot.value;
        sessionAttributes = createDistanceAttributes(distance);
        speechOutput = `Within what price range per person would you like to spend?`;
    } else {
        speechOutput = "Could you describe your distance preference again? ";
        
    }

    callback(sessionAttributes,
         buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}



function createPriceAttributes(price) {
    return {
        price,
    };
}

function setPriceTag(intent, session, callback) 
{
    const cardTitle = intent.name;
    const priceKeyWordSlot = intent.slots.price;
    let repromptText = '';
    let sessionAttributes = {};
    const shouldEndSession = false;
    let speechOutput = '';

    if (priceKeyWordSlot) {
        const price = priceKeyWordSlot.value;
        sessionAttributes = createPriceAttributes(price);
        speechOutput = `Within what time would you be going out to eat?`;
    } else {
        speechOutput = "Could you describe your price preference again? ";
        
    }

    callback(sessionAttributes,
         buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}





function createTimeAttributes(time) {
    return {
        time,
    };
}

function setTimeTag(intent, session, callback) 
{
    const cardTitle = intent.name;
    const timeKeyWordSlot = intent.slots.time;
    let repromptText = '';
    let sessionAttributes = {};
    const shouldEndSession = false;
    let speechOutput = '';

    if (timeKeyWordSlot) {
        const time = timeKeyWordSlot.value;
        sessionAttributes = createTimeAttributes(time);
        var distance = session.attributes.distance;
        var price = session.attributes.price;
        speechOutput = `Updated to 6 miles, within ${price} dollars and ${time} hours.`;
    } else {
        speechOutput = "Could you describe your time preference again? ";
        
    }

    callback(sessionAttributes,
         buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}


function getCuisine(intent, session, callback) 
{
    const cardTitle = intent.name;
    let repromptText = '';
    let sessionAttributes = {};
    const shouldEndSession = false;
    let speechOutput = '';

    
    getNearByChoices(session);
    for(var key in priceList)
    {
        speechOutput += key.toLowerCase();
        speechOutput += ','
    }
    speechOutput += ' are currently available.';

    callback(sessionAttributes,
         buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
    
}


function createChoiceAttributes(choice) {
    return {
        choice,
    };
}

function pickCuisine(intent, session, callback)
{

    const cardTitle = intent.name;
    const choiceKeyWordSlot = intent.slots.choice;
    let repromptText = '';
    let sessionAttributes = {};
    const shouldEndSession = false;
    let speechOutput = '';
    
    //getNearByChoices(session);
    
    if (choiceKeyWordSlot) {
        const choice = choiceKeyWordSlot.value;
        sessionAttributes = createChoiceAttributes(choice);
        let price = priceList[choice.toString().toUpperCase()];
        let restaurant = restaurantList[choice.toString().toUpperCase()];
        speechOutput = `Confirming ${choice} cuisine from `+ restaurant + ` that costs ` + price + ` dollars. Confirm?`;
    } else {
        speechOutput = "Please describe your choice again";
        
    }

    callback(sessionAttributes,
         buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
    
}


function onSessionStarted(sessionStartedRequest, session) 
{
    console.log(`onSessionStarted requestId=${sessionStartedRequest.requestId}, sessionId=${session.sessionId}`);
}


function onLaunch(launchRequest, session, callback) 
{
    console.log(`onLaunch requestId=${launchRequest.requestId}, sessionId=${session.sessionId}`);


    getWelcomeResponse(callback);
}


function onIntent(intentRequest, session, callback) 
{
    console.log(`onIntent requestId=${intentRequest.requestId}, sessionId=${session.sessionId}`);

    const intent = intentRequest.intent;
    const intentName = intentRequest.intent.name;

    if (intentName === 'YesIntent')
    {
        getDistanceResponse(callback);
    }
    else if(intentName === 'NoIntent')
    {
        handleSessionEndRequest(callback);
    }
    else if (intentName === 'DistanceIntent') 
    {
        setDistanceTag(intent, session, callback);
    }
    else if (intentName === 'PriceIntent') 
    {
        setPriceTag(intent, session, callback);
    }
    else if(intentName ===  'TimeIntent')
    {
        setTimeTag(intent, session, callback);
    }
    else if (intentName === 'GetCuisineIntent') 
    {
        getCuisine(intent, session, callback);
    } 
    else if (intentName === 'PickCuisineIntent')
    {
        pickCuisine(intent, session, callback);
    }
    else if (intentName == 'RepeatIntent')
    {
        getCuisine(intent, session, callback);
    }
    else if (intentName === 'ConfirmIntent')
    {
        confirmOrderResponse(callback);
    }
    else if (intentName === 'AMAZON.HelpIntent') 
    {
        getWelcomeResponse(callback);
    } 
    else if (intentName === 'AMAZON.StopIntent' || intentName === 'AMAZON.CancelIntent' || intentName === 'EndIntent') 
    {
        handleSessionEndRequest(callback);
    }
    else 
    {
        throw new Error('Invalid intent');
    }
}


function onSessionEnded(sessionEndedRequest, session) 
{
    console.log(`onSessionEnded requestId=${sessionEndedRequest.requestId}, sessionId=${session.sessionId}`);
}


exports.handler = (event, context, callback) => 
{
    try {
        console.log(`event.session.application.applicationId=${event.session.application.applicationId}`);

        if (event.session.new) {
            onSessionStarted({ requestId: event.request.requestId }, event.session);
        }

        if (event.request.type === 'LaunchRequest') 
        {
            onLaunch(event.request,event.session,
                (sessionAttributes, speechletResponse) => 
                {
                    callback(null, buildResponse(sessionAttributes, speechletResponse));
                });
        } 
        else if (event.request.type === 'IntentRequest') 
        {
            onIntent(event.request,event.session,
                (sessionAttributes, speechletResponse) => 
                {
                    callback(null, buildResponse(sessionAttributes, speechletResponse));
                });
        } 
        else if (event.request.type === 'SessionEndedRequest') 
        {
            onSessionEnded(event.request, event.session);
            callback();
        }
    } 
    catch (err) 
    {
        callback(err);
    }
};



//Sample Utterances
YesIntent sure
YesIntent yes
NoIntent no
NoIntent nope
EndIntent thank you
GetCuisineIntent What choices do I have
GetCuisineIntent What is available right now
GetCuisineIntent What restaurants are open
RepeatIntent can you repeat
RepeatIntent go back
ConfirmIntent confirm the order
ConfirmIntent confirm
PickCuisineIntent Can I have {choice}
PickCuisineIntent I want {choice}
DistanceIntent {distance} miles
DistanceIntent within {distance} miles
PriceIntent {price} dollars
PriceIntent within {price} dollars
TimeIntent {time} hours
TimeIntent within {time} hours