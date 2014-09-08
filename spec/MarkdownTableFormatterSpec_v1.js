describe("MarkdownTableFormatter", function() {

  // TODO: Add test where the first data cell is the longest cell.
  // TODO: Add test where there are more body columns than header columns.
  // TODO: Right justify numbers
  // TODO: Deal with lines that don't have a starting "|"
  // TODO: Deal with lines that don't have an ending "|"

  var mtf;
  var cells;
  var column_widths;
  var input_cells;
  var input_table;
  var output_cells;
  var output_table;

  
  beforeEach(function() {
    
    mtf = new MarkdownTableFormatter();
    
    cells = new Array();
    column_widths = new Array();
    input_cells = new Array();
    input_table = "";
    output_cells = new Array();
    output_table = "";

  });


  ////////////////////////////////////////////////////////////////////////////////

  // describe("fill_empty_body_cells", function() {

  //     // GIVEN
  //     mtf.source_table = "|h1|h2|h3|h4|\n|-|-|\n|d1|d2|d3|\n|e1|e2|\n|f1|f2|f3|f4|\n\n";

  //     // WHEN
  //     mtf.load_body_cells();

  //     // THEN
  //     expect(mtf.body_cells).toEqual([['', 'd1', 'd2', 'd3', '', ''], ['', 'e1', 'e2', '', '', ''], ['', 'f1', 'f2', 'f3', 'f4', '']]);

  // });



////////////////////////////////////////////////////////////////////////////////

  // describe("calculate_column_widths", function() {


  //   // GIVEN
  //   // mtf.header_cells = [['', 'h1', 'h2', '']];
  //   // mtf.body_cells = [['', 'd1', 'd2', '']];

  //   // // WHEN
  //   // mtf.load_header_cells();
  //   // mtf.load_body_cells();


  // });



  ////////////////////////////////////////////////////////////////////////////////

  describe("initialization", function() {

    it("should properly initialize the instance variables", function() {

      // GIVEN
      mtf = new MarkdownTableFormatter();

      // THEN
      expect(mtf.column_widths.length).toEqual(0);
      expect(mtf.input_cells.length).toEqual(0);
      expect(mtf.output_cells.length).toEqual(0);

    });

  });


  ////////////////////////////////////////////////////////////////////////////////

  // describe("calculate_column_widths", function() {

  //   it("should set basic column widths properly", function() {

  //     // GIVEN
  //     mtf.header_cells = [['', 'h1', 'h2', '']];
  //     mtf.body_cells = [['', 'd1', 'd2', '']];

  //     // WHEN
  //     mtf.calculate_column_widths();

  //     // THEN
  //     expect(mtf.column_widths).toEqual([0,2,2,0]);

  //   });

  // });




  ////////////////////////////////////////////////////////////////////////////////

  describe("load_body_cells", function() {

    it("should properly load basic data cells", function() {

      // GIVEN
      mtf.source_table = "|h1|h2|\n|-|-|\n|d1|d2|";

      // WHEN
      mtf.load_body_cells();

      // THEN
      expect(mtf.body_cells).toEqual([['', 'd1', 'd2', '']]);

    });


    it("should should strip white space from data cells", function() {
      // GIVEN
      mtf.source_table = "|h1|h2|\n|-|-|\n| d1 |   d2    |";

      // WHEN
      mtf.load_body_cells();

      // THEN
      expect(mtf.body_cells).toEqual([['', 'd1', 'd2', '']]);      
    });


    it("should skip lines with just white space", function() {

      // GIVEN
      mtf.source_table = "|h1|h2|\n|-|-|\n|d1|d2|\n\n\n\n";

      // WHEN
      mtf.load_body_cells();

      // THEN
      expect(mtf.body_cells).toEqual([['', 'd1', 'd2', '']]);

    });


    it("should pull in multiple lines", function() {

      // GIVEN
      mtf.source_table = "|h1|h2|\n|-|-|\n|d1|d2|\n|e1|e2|\n|f1|f2|\n\n";

      // WHEN
      mtf.load_body_cells();

      // THEN
      expect(mtf.body_cells).toEqual([['', 'd1', 'd2', ''], ['', 'e1', 'e2', ''], ['', 'f1', 'f2', '']]);

    });

  });




  ////////////////////////////////////////////////////////////////////////////////

  describe("load_header_cells", function() {

    it("should load basic header cells", function() {

      // GIVEN
      mtf.source_table = "|h1|h2|\n|-|-|\n|d1|d2|";
      
      // WHEN
      mtf.load_header_cells();

      // THEN
      expect(mtf.header_cells).toEqual([['', 'h1', 'h2', '']]);
      
    });

    it("should remove white space from header cells", function() {

      // GIVEN
      mtf.source_table = "|h1| h2| h3 |h4  |\n|-|-|-|-|\n| d1| d2 |d3|d4  |";

      // WHEN
      mtf.load_header_cells();

      // THEN
      expect(mtf.header_cells).toEqual([['', 'h1', 'h2', 'h3', 'h4', '']]);
      
    });

  });




  ////////////////////////////////////////////////////////////////////////////////

  // TODO: Remove this when the load_header_cells and load_body_cells replaces set_input_cells
  describe("set_input_cells", function() {

    // it("should properly create the array of arrays for all table cells", function() {

    //   // GIVEN
    //   mtf.source_table = "|h1|h2|\n|-|-|\n|d1|d2|";
      
    //   // WHEN
    //   mtf.load_header_cells();

    //   // THEN
    //   expect(mtf.header_cells).toEqual(['', 'h1', 'h2', '']);


    //   // THEN
    //   // expect(mtf.cells).toEqual([ ['h1'], [], []]);

    //   // THEN
    //   // expect(mtf.input_cells[0].length).toEqual(4);
    //   // expect(mtf.input_cells[0]).toEqual(['', 'h1_c', 'h2_c', '']);

    //   // expect(mtf.input_cells[1].length).toEqual(4);
    //   // expect(mtf.input_cells[1]).toEqual(['', '-', '-', '']);
      
    //   // expect(mtf.input_cells[2].length).toEqual(4);
    //   // expect(mtf.input_cells[2]).toEqual(['', 'd1_c', 'd2_c', '']);
      
    // });


    // it("should properly remove white space when loading the table", function() {

    //   // GIVEN
    //   input_table = "|h1| h2| h3 |h4  |\n|-|-|-|-|\n| d1| d2 |d3|d4  |";

    //   // WHEN
    //   mtf.set_input_cells(input_table);

    //   // THEN
    //   expect(mtf.input_cells[0]).toEqual(['', 'h1', 'h2', 'h3', 'h4', '']);
    //   expect(mtf.input_cells[2]).toEqual(['', 'd1', 'd2', 'd3', 'd4', '']);
      
    // });

    it("should chop down separator to a single one to prevent throwing off widths", function() {
      
      // GIVEN
      input_table = "|h1|h2|\n|------|---------|\n|d1|d2|";

      // WHEN
      mtf.set_input_cells(input_table);

      // THEN
      expect(mtf.input_cells[1]).toEqual([ '', '-', '-', '' ]);

    });  


    it("should not add output rows for empty lines", function() {

      // GIVEN
      input_table = "|h1|h2|\n|--|--|\n|d1|d2|\n\n";

      // WHEN 
      mtf.set_input_cells(input_table);

      // THEN
      expect(mtf.input_cells.length).toEqual(3);

    });


  });


  ////////////////////////////////////////////////////////////////////////////////

  describe("set_column_widths", function() {

    it("should properly identify target column widths when source has no padding", function() {
      
      // GIVEN
      mtf.input_cells = [ ['', 'h1', 'h2', 'h3', ''], ['', '-', '-', '-', ''], ['', 'd1', 'd2', 'd3', ''] ];

      // WHEN
      mtf.set_column_widths();

      // THEN
      expect(mtf.column_widths).toEqual([0, 2, 2, 2, 0]);
      
    });

    it("should properly identify column widths when the header is longer than the cells", function() {

      // GIVEN
      mtf.input_cells = [ ['', 'header_long', 'header', ''], ['', '-', '-', ''], ['', 'd1', 'd2', ''] ];

      // WHEN
      mtf.set_column_widths();

      // THEN
      expect(mtf.column_widths).toEqual([0, 11, 6, 0 ]);
      
    });

    it("should properly set column widths when a cell in the last row is the longest", function() {

      // GIVEN
      mtf.input_cells = [ ['', 'h1', 'h2', ''], ['', '-', '-', ''], ['', 'data_cell', 'long_data_cell', ''] ];

      // WHEN
      mtf.set_column_widths();

      // THEN
      expect(mtf.column_widths).toEqual([0, 9, 14, 0]);

    });

  });


  ////////////////////////////////////////////////////////////////////////////////

  describe("set_output_cells", function() {

    it("should properly pad header output_cells", function() {

      // GIVEN
      input_cells = [ ['', 'h1', 'h2', 'h3', ''] ];
      column_widths = [0, 2, 2, 2, 0];
      
      // WHEN
      mtf.set_output_cells(input_cells, column_widths);

      // THEN
      expect(mtf.output_cells).toBeDefined();
      expect(mtf.output_cells).toEqual([ ['', ' h1 ', ' h2 ', ' h3 ', ''] ]);

    });

    it("should properly expand separator output_cells", function() {

      // GIVEN
      input_cells = [ ['', 'h1', 'h2', 'h3', ''], ['', '-', '-', '-', ''] ];
      column_widths = [0, 2, 2, 2, 0];
      output_cells = [ ['', ' h1 ', ' h2 ', ' h3 ', ''], ['', '----', '----', '----', ''] ];
      
      // WHEN
      mtf.set_output_cells(input_cells, column_widths);

      // THEN
      expect(mtf.output_cells).toEqual(output_cells);

    });

    it("should properly expand a full set of basic data cells", function() {

      // GIVEN
      input_cells = [ ['', 'h1', 'h2', 'h3', ''], ['', '-', '-', '-', ''], ['', 'd1', 'd2', 'd3', ''] ];
      column_widths = [0, 2, 2, 2, 0];
      output_cells = [ ['', ' h1 ', ' h2 ', ' h3 ', ''], ['', '----', '----', '----', ''], ['', ' d1 ', ' d2 ', ' d3 ', ''] ];
      
      // WHEN
      mtf.set_output_cells(input_cells, column_widths);
      
      // THEN
      expect(mtf.output_cells).toEqual(output_cells);

    });

    it("should properly expand data cells based on header length", function() {

      // GIVEN
      input_cells = [ ['', 'h1_long', 'h2_longer', 'h3', ''], ['', '-', '-', '-', ''], ['', 'd1', 'd2', 'd3', ''] ];
      column_widths = [0, 7, 9, 2, 0];
      output_cells = [ ['', ' h1_long ', ' h2_longer ', ' h3 ', ''], ['', '---------', '-----------', '----', ''], ['', ' d1      ', ' d2        ', ' d3 ', ''] ];

      // WHEN
      mtf.set_output_cells(input_cells, column_widths);

      // THEN
      expect(mtf.output_cells).toEqual(output_cells);

    });


    it("should fill in missing data cells", function() {

      // GIVEN
      mtf.input_cells = [ 
        ['', 'h1', 'h2', 'h3', ''], 
        ['', '--', '--', '--', ''], 
        ['', 'd1', 'd2', '']
      ];
      
      mtf.column_widths = [0, 2, 2, 2, 0];
      
      // WHEN
      mtf.add_missing_input_cells();

      // THEN
      expect(mtf.input_cells).toEqual([ 
        ['', 'h1', 'h2', 'h3', ''], 
        ['', '--', '--', '--', ''], 
        ['', 'd1', 'd2', '', '']
      ]);

    });

  });



  ////////////////////////////////////////////////////////////////////////////////

  describe("set_output_table", function() {

    it("should properly build a basic table", function() {

      // GIVEN
      output_cells = [ ['', ' h1 ', ' h2 ', ' h3 ', ''], ['', '----', '----', '----', ''], ['', ' d1 ', ' d2 ', ' d3 ', ''] ];

      output_table = "";
      output_table += "| h1 | h2 | h3 |\n";
      output_table += "|----|----|----|\n";
      output_table += "| d1 | d2 | d3 |\n";

      // WHEN
      mtf.set_output_table(output_cells)

      // THEN
      expect(mtf.output_table).toEqual(output_table);

    });

  });


  ////////////////////////////////////////////////////////////////////////////////

  describe("Test full table builds", function() {

    // Note that the tool puts a newline after the last row. This is 
    // desired, but can catch you off guard if you don't notice and 
    // add it when writing test comparisons.

    it("should not alter an already formatted table", function() {

      // GIVEN
      input_table = "| h1 | h2 | h3 |\n|----|----|----|\n| d1 | d2 | d3 |";
      output_table = "| h1 | h2 | h3 |\n|----|----|----|\n| d1 | d2 | d3 |\n";

      // THEN
      expect(mtf.format_table(input_table)).toEqual(output_table);

    });

    it("should update a standard table properly", function() {

      // GIVEN
      input_table = ""
      input_table += "|h1|h2_more|h3_longer|\n";
      input_table += "|-|-|-|\n";
      input_table += "|d1|d2|d3|";

      output_table = "";
      output_table += "| h1 | h2_more | h3_longer |\n";
      output_table += "|----|---------|-----------|\n";
      output_table += "| d1 | d2      | d3        |\n";

      // THEN
      expect(mtf.format_table(input_table)).toEqual(output_table);
      
    });

    it("should add empty cells where necessary", function() {

      // GIVEN
      input_table = ""
      input_table += "|h1|h2_more|h3_longer|\n";
      input_table += "|-|-|-|\n";
      input_table += "|d1|d2|d3|\n";
      input_table += "|e1|e2|\n";
      input_table += "|f1|\n";

      output_table = "";
      output_table += "| h1 | h2_more | h3_longer |\n";
      output_table += "|----|---------|-----------|\n";
      output_table += "| d1 | d2      | d3        |\n";
      output_table += "| e1 | e2      |           |\n";
      output_table += "| f1 |         |           |\n";

      // THEN
      expect(mtf.format_table(input_table)).toEqual(output_table);

    });

  });

});