export default class TapBarkTests {

    // CONSTRUCTOR

    // setup called on output
    // parser on events called
    

    // create()

    // returns a valid TapBark instance
    // returns a different instance each time


    // getPipeable()
    
    // returns a duplex of parser and output stream
    // returns a different instance each time


    // setupListeners()

    // on "plan"
    // * updates this._planEnd

    // on "comment"
    // * calls setFixtureName if starts with #Fixture and a space
    // * otherwise it doesn'this

    // on "assert"
    // * calls output.outputResults with
    //   - correct pass (results.pass or 0)
    //   - correct fail (results.fail or results.failures length or 0)
    //   - correct ignore (results.skip or 0 + results.todo or 0)
    //   - correct failures (results.failures)
    // * calls process.exit with 0 if results.ok === true
    // * calls process.exit with 1 if results.ok === false

}