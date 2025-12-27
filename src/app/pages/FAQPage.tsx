import React from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { faqs } from '../data/mockData';

export const FAQPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <HelpCircle className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl mb-4 text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Find answers to common questions about our services
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Common Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-gray-900 dark:text-white">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-300">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <Card className="mt-8 bg-blue-600 text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl mb-4">Still have questions?</h2>
            <p className="mb-6 text-blue-100">
              Can't find the answer you're looking for? Please contact our support team.
            </p>
            <a href="/contact">
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors">
                Contact Support
              </button>
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
