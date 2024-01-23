import {render,screen,cleanup} from "@testing-library/react";
import renderer from "react-test-renderer";
import Test from "../../DashBoard";
import "@testing-library/jest-dom";
import DashBoard from "../../DashBoard";

afterEach(()=>{
    cleanup();
});

test("should render dashboard component",()=>{
    render(<DashBoard/>);
     var DashElem= screen.getByTestId("search_box");
     expect(DashElem).toBeInTheDocument();
})