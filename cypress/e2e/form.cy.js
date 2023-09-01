describe('App', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3003')
    })

    const usernameInput = () => cy.get("input[name=username]");
    const favLanguageInputJS = () => cy.get('input[value=javascript]');
    const favLanguageInputRust = () => cy.get('input[value=rust]');
    const favfoodSelect = () => cy.get('select[name=favFood]');
    const agreementInput = () => cy.get('input[name=agreement]');
    const submitInput = () => cy.get('input[type=submit]');

    it('sanity test', () => {
        expect(1 + 1).to.equal(2);
        expect(4 * 4).to.equal(16);
        expect({}).not.to.equal({})
    })

    it('Proper elements on page', () => {
        usernameInput().should('exist');
        favLanguageInputJS().should('exist');
        favLanguageInputRust().should('exist');
        favfoodSelect().should('exist');
        agreementInput().should('exist');
        submitInput().should('exist');

    })

    describe("Submitting", () => {
        it('can nivigate to the site', () => {
            cy.url().should("include", "localhost");
        })

        it("submit button starts out disabled", () => {
            submitInput().should('be.disabled')
        })

        it('can type in the username', () => {
            usernameInput().should('have.value', "")
                .type('Josh Ack')
                .should('have.value', 'Josh Ack');
        })

        it('can select favorite language (JS)', () => {
            favLanguageInputJS().should('have.value', 'javascript');
        })

        it('can select favorite language (Rust)', () => {
            favLanguageInputRust().should('have.value', 'rust');
        })

        it('can seleect Favorite food', () => {
            favfoodSelect().should('have.value', '');

            favfoodSelect().select('spaghetti');
            favfoodSelect().should('have.value', 'spaghetti');

            favfoodSelect().select('pizza');
            favfoodSelect().should('have.value', 'pizza');

            favfoodSelect().select('broccoli');
            favfoodSelect().should('have.value', 'broccoli');

        })

        it('can select Favorite food', () => {
            favfoodSelect().should('have.value', '');

            ['spaghetti', 'pizza', 'broccoli'].forEach(option => {
                favfoodSelect().select(option);
                favfoodSelect().should('have.value', option);
            });
        });

        describe('filing document and submitting', () => {

            it('can fill out the entire form and enable submit button', () => {
                usernameInput().type('YourUsername');

                favLanguageInputJS().check();

                favfoodSelect().select('pizza');

                agreementInput().check();

                submitInput().should('not.be.disabled')

                cy.get('form').submit();

                submitInput().should('be.disabled')
            })
        })


    })


})