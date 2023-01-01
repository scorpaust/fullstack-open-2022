describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      username: "scorpaust",
      name: "Dinis Miguel Costa",
      password: "teste1234",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("login");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.login({ username: "scorpaust", password: "teste1234" });
      cy.contains("create new blog");
    });

    it("fails with wrong credentials", function () {
      cy.contains("login").click();
      cy.get("#username").type("lala");
      cy.get("#password").type("testfail123");
      cy.get("#login").click();
      cy.get(".error")
        .contains("[error] invalid username or password")
        .and("have.css", "color", "rgb(255, 0, 0)");
    });
  });

  describe("When logged in...", function () {
    beforeEach(function () {
      cy.login({ username: "scorpaust", password: "teste1234" });
    });

    it("A blog can be created", function () {
      cy.createBlog({
        title: "Some cool blog",
        author: "Dinis Costa",
        url: "http://test1234.com",
      });
      cy.contains("Some cool blog");
    });

    describe("And with multiple blog entries...", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "Blog about that something cool 1",
          author: "Dinis Costa",
          url: "http://test1234.com",
        });
        cy.createBlog({
          title: "Blog about that something cool 2",
          author: "Dinis Costa",
          url: "http://test12345.com",
        });
        cy.createBlog({
          title: "Blog about that something cool 3",
          author: "Dinis Costa",
          url: "http://test123456.com",
        });
      });

      it("user can put a like on one of those...", function () {
        cy.contains("cool 1").parent().find("button").click();
        cy.get("#like-btn").click().wait(1000);
        cy.contains("cool 1").parent().find("button").click();
      });

      it("user can put likes on the others and they are ordered by number of likes desc", function () {
        cy.contains("cool 2").parent().find("button").click();
        cy.get("#like-btn")
          .click()
          .wait(1000)
          .click()
          .wait(1000)
          .click()
          .wait(1000);
        cy.contains("cool 2").parent().find("button").click();

        cy.contains("cool 3").parent().find("button").click();
        cy.get("#like-btn").click().wait(1000).click().wait(1000);
        cy.contains("cool 3").parent().find("button").click();

        cy.get(".blog-item").eq(0).should("contain", "cool 2");
        cy.get(".blog-item").eq(1).should("contain", "cool 3");
        cy.get(".blog-item").eq(2).should("contain", "cool 1");
      });

      it("other users cannot delete the creator's blog", function () {
        cy.contains("logout").click();
        const user = {
          username: "luisb",
          name: "Luís Brandão",
          password: "pacheco",
        };
        cy.request("POST", "http://localhost:3003/api/users/", user);
        cy.visit("http://localhost:3000");
        cy.login({ username: "luisb", password: "pacheco" });
        cy.contains("cool 2").parent().find("button").click();
        cy.get("html").should("not.contain", "delete");
      });

      it("user who created one of those can delete it", function () {
        cy.contains("cool 2").parent().find("button").click();
        cy.get("#delete-btn").click();
        cy.get("html").should("not.contain", "cool 2");
      });
    });
  });
});
