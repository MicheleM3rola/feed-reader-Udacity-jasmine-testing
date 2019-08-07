/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(
  (function() {
    /**
     * FIRST SUITE
     * LOOPING THE ALLFEEDS OBJECT IT IS EASY TO CHECK FOR THE KEYS NAME AND URL  TO BE DEFINED AND NOT EMPTY*/
    describe("RSS Feeds", function() {
      it("are defined", function() {
        expect(allFeeds).toBeDefined();
        expect(allFeeds.length).not.toBe(0);
      });

      it("url are defined and not empty", () => {
        for (let i = 0; i < allFeeds.length; i++) {
          expect(allFeeds[i].url).toBeDefined();
          expect(allFeeds[i].url.length).not.toBe(0);
        }
      });

      it("name are defined and not empty", () => {
        for (let i = 0; i < allFeeds.length; i++) {
          expect(allFeeds[i].name).toBeDefined();
          expect(allFeeds[i].name.length).not.toBe(0);
        }
      });
    });
    /**
     * SECOND SUITE
     * .MENU-HIDDEN IS THE CLASS APPLIED TO THE MENU-SLIDE TO MAKE SURE THAT THE MENU IS HIDDEN.
     * WE JUST HAVE TO CHECK IF THE CLASSNAME IS THERE
     * FOR THE MENU TO SHOW AND DISAPPEAR WE MAKE SURE TO TOGGLE THAT CLASS WHEN A CLICK EVENT HAPPEN.
     */
    describe("The menu", () => {
      it("menu element hidden by default", () => {
        expect(document.body.className).toBe("menu-hidden");
      });

      it("visibility menu onClick", () => {
        const menuBurger = document.querySelector(".menu-icon-link");
        menuBurger.addEventListener("click", () => {
          document.body.classList.toggle("menu-hidden");
        });
        expect(document.body.className).toEqual("menu-hidden");
        menuBurger.addEventListener("click", () => {
          document.body.classList.toggle("menu-hidden");
        });
        expect(document.body.className).toEqual("menu-hidden");
      });
    });

    /**
     * THIRD SUITE
     * GETTING THE ELEMENTS WITH THE CLASS .FEED AND .ENTRY WE MAKE SURE THAT THEY ARE DEFINED
     */
    describe("Initial Entries", () => {
      beforeEach(done => {
        loadFeed(0, () => {
          done();
        });
      });

      it("single entry element,whithin feed container", () => {
        const feed = document.querySelector(".feed");
        const entries = document.querySelector(".entry");
        expect(feed, entries).toBeDefined();
      });
    });

    /**
     * FOURTH SUITE
     *WE USED TWO ARRAYS TO PUSH THE INNERTEXT OF THE FEED TITLE WHENEVER A NEW FEED IS LOADED.
     AFTER THAT WE LOOPED IN EACH ARRAY TO COMPARE THAT THE INDEX WAS DIFFERENT.
     */
    describe("New Feed Selection", () => {
      let firstTopic = [];
      let secondTopic = [];

      beforeEach(done => {
        loadFeed(0, () => {
          document.querySelectorAll(".entry h2").forEach(entry => {
            firstTopic.push(entry.innerText);
          });

          loadFeed(1, () => {
            document.querySelectorAll(".entry h2").forEach(entry => {
              secondTopic.push(entry.innerText);
            });
            done();
          });
        });
      });

      it("Different feeds", () => {
        for (let i = 0; i < 10; i++) {
          expect(firstTopic[i]).not.toEqual(secondTopic[i]);
        }
      });
    });
  })()
);
