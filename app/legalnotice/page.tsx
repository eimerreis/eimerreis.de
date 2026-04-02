import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Legal Notice',
  description: 'Legal notice and contact information for Moritz Frölich.',
};

export default function LegalNoticePage() {
  return (
    <div className="pb-16 pt-2">
      <header className="reveal border-b border-line pb-10">
        <p className="eyebrow">Legal Notice</p>
        <h1 className="mt-3 max-w-4xl font-display text-5xl tracking-[-0.03em] md:text-7xl">Legal Notice</h1>
      </header>

      <section className="stagger-children grid gap-6 py-10">
        <article className="surface reveal delay-1 rounded-[1.9rem] px-6 py-7 md:px-7 md:py-8">
          <h2 className="font-display text-3xl tracking-tight md:text-4xl">Information according to §5 TMG</h2>
          <div className="mt-6 whitespace-pre-line font-medium text-ink">
            {'Moritz Frölich\nLandhausstraße 69\n72250 Freudenstadt\n\nMail: office@eimerreis.de'}
          </div>
        </article>

        <article className="surface reveal delay-1 rounded-[1.9rem] px-6 py-7 md:px-7 md:py-8">
          <h2 className="font-display text-3xl tracking-tight md:text-4xl">Information according to §55 Abs. 2 RStV</h2>
          <p className="mt-6 text-muted">
            Editor-in-chief, publisher and responsible for content according to §55 Abs. 2 RStV:
          </p>
          <div className="mt-6 whitespace-pre-line font-medium text-ink">
            {'Moritz Frölich\nLandhausstraße 69\n72250 Freudenstadt'}
          </div>
        </article>

        <article className="surface reveal delay-1 rounded-[1.9rem] px-6 py-7 md:px-7 md:py-8">
          <h2 className="font-display text-3xl tracking-tight md:text-4xl">Address processing</h2>
          <p className="mt-4 text-muted">
            All personal contact information provided on this website, including any photos, is expressly for
            information purposes only or for making contact. In particular, they may not be used for sending
            advertising, spam or similar. We therefore hereby object to any use of this data for advertising purposes.
            Should this information nevertheless be used for the aforementioned purposes, we reserve the right to take
            legal action.
          </p>
        </article>

        <article className="surface reveal delay-1 rounded-[1.9rem] px-6 py-7 md:px-7 md:py-8">
          <h2 className="font-display text-3xl tracking-tight md:text-4xl">Disclaimer</h2>

          <h3 className="mt-6 font-display text-2xl tracking-tight">Liability for content</h3>
          <p className="mt-4 text-muted">
            As a service provider, we are responsible for our own content on these pages in accordance with Section 7
            (1) TMG (German Telemedia Act) and general legislation. According to §§ 8 to 10 TMG, however, we as a
            service provider are not obliged to monitor transmitted or stored third-party information or to investigate
            circumstances that indicate illegal activity.
          </p>
          <p className="mt-4 text-muted">
            Obligations to remove or block the use of information in accordance with general legislation remain
            unaffected by this. However, liability in this respect is only possible from the time of knowledge of a
            specific infringement. As soon as we become aware of such infringements, we will remove this content
            immediately.
          </p>

          <h3 className="mt-8 font-display text-2xl tracking-tight">Liability for links</h3>
          <p className="mt-4 text-muted">
            Our website contains links to external third-party websites over whose content we have no influence.
            Therefore, we cannot accept any liability for this third-party content. The respective provider or operator
            of the pages is always responsible for the content of the linked pages. The linked pages were checked for
            possible legal violations at the time of linking. Illegal content was not recognizable at the time of
            linking.
          </p>
          <p className="mt-4 text-muted">
            However, permanent monitoring of the content of the linked pages is not reasonable without concrete evidence
            of an infringement. If we become aware of any legal infringements, we will remove such links immediately.
          </p>

          <h3 className="mt-8 font-display text-2xl tracking-tight">Copyright</h3>
          <p className="mt-4 text-muted">
            The content and works created by the site operators on these pages are subject to German copyright law.
            Duplication, processing, distribution and any kind of exploitation outside the limits of copyright law
            require the written consent of the respective author or creator. Downloads and copies of this site are only
            permitted for private, non-commercial use.
          </p>
          <p className="mt-4 text-muted">
            Insofar as the content on this site was not created by the operator, the copyrights of third parties are
            respected. In particular, third-party content is identified as such. Should you nevertheless become aware of
            a copyright infringement, please inform us accordingly. If we become aware of any infringements, we will
            remove such content immediately.
          </p>
        </article>

        <article className="surface reveal delay-1 rounded-[1.9rem] px-6 py-7 md:px-7 md:py-8">
          <h2 className="font-display text-3xl tracking-tight md:text-4xl">Data protection</h2>
          <p className="mt-4 text-muted">
            No personal data is collected, stored or processed on this website. No cookies are used.
          </p>
        </article>
      </section>
    </div>
  );
}
