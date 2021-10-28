import React from "react";
import { render, screen, fireEvent } from "../../redux/test-utils";
import "@testing-library/jest-dom";

import TeamButtons from "../team-buttons/team-buttons";

describe("<TeamButtons />", () => {
  it("should call onClickDelete function on clicking delete team button", () => {
    const onClickDeleteMock = jest.fn();

    render(<TeamButtons onClickDelete={onClickDeleteMock} />);

    fireEvent.click(screen.getByTestId("delete-team-button"));

    expect(onClickDeleteMock).toHaveBeenCalledTimes(1);
  });
});
