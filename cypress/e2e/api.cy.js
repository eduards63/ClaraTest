describe('PetStore API User Test', () => {
  const userData = {
    id: 6326,
    username: "eduards",
    firstName: "Eduardo",
    lastName: "Leal",
    email: "Test@mail.com",
    password: "warmup123s",
    phone: "+52123456789",
    userStatus: 1
  };

  it('Created a user with PetStore API', () => {

    cy.request({
      method: 'POST',
      url: 'https://petstore.swagger.io/v2/user',
      body: userData,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((postResponse) => {

      expect(postResponse.status).to.eq(200);
      expect(postResponse.body).to.have.property('message', userData.id.toString());
      cy.log('Created User:', JSON.stringify(postResponse.body));
    });
  });
});