"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Link,
  Spacer,
} from "@nextui-org/react";
import { siteConfig } from "@/config/site";
import { ALL_TIERS } from "@/config/tiers";
import { FaCheck } from "react-icons/fa";
import { RoughNotation } from "react-rough-notation";

const Pricing = ({
  id,
  locale,
  langName,
}: {
  id: string;
  locale: any;
  langName: string;
}) => {
  const [isYearly, setIsYearly] = useState(false);
  const TIERS = ALL_TIERS[`TIERS_${langName.toUpperCase()}`];

  return (
    <section
      id={id}
      className="flex flex-col justify-center max-w-5xl items-center pt-20"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col text-center max-w-xl"
      >
        <h2 className="text-center text-white">
          <RoughNotation type="highlight" show={true} color="#2563EB">
            {locale.title}
          </RoughNotation>
        </h2>
        <Spacer y={4} />
        <p className="text-lg text-default-500">{locale.description}</p>
      </motion.div>

      {/* Monthly/Yearly Toggle */}
      {locale.toggleMonthly && locale.toggleYearly && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 flex items-center gap-3 bg-default-100 rounded-full p-1"
        >
          <button
            onClick={() => setIsYearly(false)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              !isYearly
                ? "bg-background text-foreground shadow-sm"
                : "text-default-500"
            }`}
          >
            {locale.toggleMonthly}
          </button>
          <button
            onClick={() => setIsYearly(true)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              isYearly
                ? "bg-background text-foreground shadow-sm"
                : "text-default-500"
            }`}
          >
            {locale.toggleYearly}
            {locale.saveLabel && (
              <span className="ml-1.5 inline-flex items-center rounded-full bg-green-100 dark:bg-green-900/50 px-2 py-0.5 text-xs font-medium text-green-700 dark:text-green-300">
                {locale.saveLabel}
              </span>
            )}
          </button>
        </motion.div>
      )}

      <Spacer y={8} />

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 justify-items-center w-full max-w-4xl">
        {TIERS?.map((tier, index) => (
          <motion.div
            key={tier.key}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={tier.mostPopular ? "relative scale-[1.02] w-full" : "w-full"}
          >
            <Card
              className={`p-3 w-full ${
                tier.mostPopular
                  ? "border-2 border-blue-500 bg-blue-50/50 dark:bg-blue-950/20 shadow-lg shadow-blue-500/10"
                  : ""
              }`}
              shadow="md"
            >
              {tier.mostPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-1 text-xs font-semibold text-white z-10">
                  {locale.mostPopular || "Most Popular"}
                </div>
              )}
              <CardHeader className="flex flex-col items-start gap-2 pb-6">
                <h2 className="text-xl font-bold">{tier.title}</h2>
                <p className="text-sm text-default-500">{tier.description}</p>
              </CardHeader>
              <Divider />
              <CardBody className="gap-6">
                <p className="flex items-baseline gap-1 pt-2">
                  <span className="text-4xl font-bold">
                    {isYearly ? tier.yearlyPrice || tier.price : tier.price}
                  </span>
                  {tier.priceSuffix && (
                    <span className="text-sm text-default-400 ml-1">
                      {tier.priceSuffix}
                    </span>
                  )}
                </p>
                <ul className="flex flex-col gap-3">
                  {tier.features?.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <FaCheck className="text-blue-500 flex-shrink-0" />
                      <p className="text-sm text-default-500">{feature}</p>
                    </li>
                  ))}
                </ul>
              </CardBody>
              <CardFooter>
                <Button
                  fullWidth
                  as={Link}
                  color={tier.buttonColor}
                  href={tier.href}
                  variant={tier.buttonVariant}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className={
                    tier.mostPopular
                      ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold"
                      : ""
                  }
                >
                  {tier.buttonText}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      <Spacer y={12} />
      <div className="flex py-2">
        <p className="text-default-400 text-center">
          {locale.doYouLike}&nbsp;
          <Link
            color="foreground"
            href={siteConfig.authors[0].twitter}
            underline="always"
            rel="noopener noreferrer nofollow"
          >
            {locale.follow}
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Pricing;
