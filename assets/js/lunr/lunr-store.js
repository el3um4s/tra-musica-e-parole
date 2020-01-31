---
layout: null
---

var store = [
  {%- for c in site.collections -%}
    {%- if forloop.last -%}
      {%- assign l = true -%}
    {%- endif -%}
    {%- assign docs = c.docs | where_exp:'doc','doc.search != false' -%}
    {%- for doc in docs -%}
      {%- if doc.header.teaser -%}
        {%- capture teaser -%}{{ doc.header.teaser }}{%- endcapture -%}
      {%- else -%}
        {%- assign teaser = site.teaser -%}
      {%- endif -%}
      {%- if doc.header.miniatura -%}
        {%- capture miniatura -%}{{ doc.header.miniatura }}{%- endcapture -%}
      {%- else -%}
        {%- assign miniatura = site.teaser -%}
      {%- endif -%}
      {%- if doc.usa_webp -%}
        {%- assign ext_image = 'webp' -%}
      {%- else -%}
        {%- capture ext_image -%}{{ doc.header.immagine_tipo }}{%- endcapture -%}
      {%- endif -%}
      {%- if miniatura contains "://" -%}
      {%- else -%}
          {%- capture miniatura -%}{{ site.immagini }}{{ doc.date | date: "%Y/%Y-%m-%d" }}-{{ doc.url | remove_first: "/"}}{{ doc.header.miniatura }}.{{ ext_image }}{%- endcapture -%}
          {%- capture indirizzo_base -%}{{ site.immagini }}{{ doc.date | date: "%Y/%Y-%m-%d" }}-{{ doc.url | remove_first: "/"}}{%- endcapture -%}
          {%- capture nome_immagine -%}{{ doc.header.miniatura | split: '.' | first }}{%- endcapture -%}
          {%- capture miniatura -%}{{ indirizzo_base }}{{ nome_immagine }}.{{ ext_image }}{%- endcapture -%}
      {%- endif -%}
      {
        "title": {{ doc.title | jsonify }},
        "excerpt":
          {%- if site.search_full_content == true -%}
            {{ doc.content | newline_to_br |
              replace:"<br />", " " |
              replace:"</p>", " " |
              replace:"</h1>", " " |
              replace:"</h2>", " " |
              replace:"</h3>", " " |
              replace:"</h4>", " " |
              replace:"</h5>", " " |
              replace:"</h6>", " "|
            strip_html | strip_newlines | jsonify }},
          {%- else -%}
            {{ doc.content | newline_to_br |
              replace:"<br />", " " |
              replace:"</p>", " " |
              replace:"</h1>", " " |
              replace:"</h2>", " " |
              replace:"</h3>", " " |
              replace:"</h4>", " " |
              replace:"</h5>", " " |
              replace:"</h6>", " "|
            strip_html | strip_newlines | truncatewords: 50 | jsonify }},
          {%- endif -%}
        "categories": {{ doc.categories | jsonify }},
        "tags": {{ doc.tags | jsonify }},
        "url": {{ doc.url | absolute_url | jsonify }},
        "teaser":
          {%- if teaser contains "://" -%}
            {{ teaser | jsonify }}
          {%- else -%}
            {{ teaser | absolute_url | jsonify }}
          {%- endif -%},
        "miniatura": {{ miniatura | jsonify }}
      }{%- unless forloop.last and l -%},{%- endunless -%}
    {%- endfor -%}
  {%- endfor -%}]
