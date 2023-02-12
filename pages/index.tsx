import Head from "next/head";
import Spinner from "@/components/Spinner";
import Image from "next/image";
import heroImage from "@/assets/images/hero.jpg";
import { FormEvent, useState } from "react";
import FormData from "form-data";

export default function Home() {
  const [quote, setQuote] = useState(
    "I'm so excited about meeting the inspirational Ronald McDonald! It's such an honor to meet a living icon who has made a positive impact on the world. I'm sure this meeting will be full of great life lessons and advice for me to take away, and I'm ready to seize the day! #McDonalds #LivingLegend #Gratitude #Motivation"
  );
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [quoteLoadingError, setQuoteLoadingError] = useState(false);
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    // @ts-ignore
    const prompt = formData.get("prompt")?.toString().trim();

    if (prompt) {
      try {
        setQuote("");
        setQuoteLoadingError(false);
        setQuoteLoading(true);

        const response = await fetch(
          "/api/cringe?prompt=" + encodeURIComponent(prompt)
        );

        const body = await response.json();
        setQuote(body.quote);
      } catch (error) {
        console.log(error);
        setQuoteLoadingError(true);
      } finally {
        setQuoteLoading(false);
      }
    }
  }
  return (
    <>
      <Head>
        <title>LinkedIn Motivational Posts</title>
        <meta
          name="description"
          content="Generate motivational post that you can post on LinkedIn and fit right in."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="text-gray-300 py-4 px-16 flex flex-col justify-center items-center">
        <h1 className="text-4xl mb-2">LinkedIn Post Generator</h1>
        <h2 className="mb-4">
          Everytime you visit LinkedIn and see all those lovely, motivational
          posts? Have you ever wanted to write one but you are not sure that
          enough motivation is included? Try our tool.
        </h2>
        <Image
          alt="hero image"
          src={heroImage}
          width={600}
          height={600}
          priority
          className="rounded-3xl drop-shadow-xl"
        />

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center mx-auto"
        >
          <label className="mt-4" htmlFor="prompt">
            Create a LinkedIn post about...
          </label>
          <input
            type="text"
            name="prompt"
            placeholder="success, family, pokemon..."
            maxLength={100}
            className="p-2 text-black mt-4"
          />
          <button
            disabled={quoteLoading}
            type="submit"
            className="mt-4 relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              MOTIVATION!!!
            </span>
          </button>
        </form>
        {quoteLoading && <Spinner />}
        {quoteLoadingError && "Something went wrong..."}
        {quote && (
          <div className="text-center">
            <p>{quote}</p>
          </div>
        )}
      </section>
    </>
  );
}
