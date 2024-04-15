import { redirect } from "next/navigation";
import React from "react";

type SearchPageProps = {
  searchParams: {
    term: string;
  };
};

export default function SearchPage({ searchParams }: SearchPageProps) {
  const { term } = searchParams;

  if (!term) {
    redirect("/");
  }
  return <div>{term}</div>;
}
