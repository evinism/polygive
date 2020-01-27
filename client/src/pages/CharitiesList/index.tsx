import React, { useState, useEffect } from "react";
import { getCharities } from "../../api";
import { ListCharitiesResponse, Paginated } from "../../shared/polygiveApi";
import { PaddedList, WaitForLoaded } from "../../components/UIElements";
import { PageProps, LoggedInAppState } from "../../clientTypes";
import "./CharitiesList.css";
import SearchBar from "../../components/SearchBar";
import Paginator from "../../components/Paginator";
import CharityListEntry from "./CharityListEntry";

interface CharitiesListState {
  response?: Paginated<ListCharitiesResponse>;
  search?: string;
  page?: number;
}

// This is probably the buggiest thing known to mankind.
export default function CharitiesList(_: PageProps<LoggedInAppState>) {
  const [state, setState] = useState<CharitiesListState>({});
  const refetch = (nextState = state) => {
    getCharities({
      search: nextState.search,
      page: nextState.page
    }).then(res => {
      setState({
        // Ughh this is ugly
        ...nextState,
        response: res
      });
    });
  };

  useEffect(refetch, []);

  const handleSearch = async (search: string) => {
    const nextState = {
      ...state,
      search: search || undefined // lolol casting empty string to undefined.
    };
    console.log(state, nextState);
    setState(nextState);
    refetch(nextState);
  };

  const handlePageChange = async (page: number) => {
    const nextState = {
      ...state,
      page
    };
    console.log(state, nextState);
    setState(nextState);
    refetch(nextState);
  };

  return (
    <div className="charities-list">
      <h2>Charities</h2>
      <SearchBar onSearch={handleSearch} />
      <Paginator
        page={state.page || 1}
        totalPages={(state.response && state.response.totalPages) || 1}
        setPage={handlePageChange}
      />
      <WaitForLoaded
        // WHAT THE FUCK IS THIS EVIN
        item={state.response}
      >
        {response => (
          <PaddedList
            items={response.data.map(charity => (
              <CharityListEntry charity={charity} />
            ))}
          />
        )}
      </WaitForLoaded>
    </div>
  );
}
